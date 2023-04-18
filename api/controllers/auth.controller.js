import userModel from "../models/user.model";
import createError from "../utils/createError";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
    try {
        const hashPassword = bcrypt.hashSync(req.body.password, 5);
        const newUser = new userModel({
            ...req.body,
            password: hashPassword,
        });

        await newUser.save();
        res.status(201).send("User has been created");

    } catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({username: req.body.username});

        if(!user) return next(createError(404, "User not found"));

        const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);

        if(!isCorrectPassword) return next(createError(400, "Wrong credentials"));

        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller, 
            },
            process.env.JWT_KEY
        );
        const { password, ...info} = user._doc;

        res.cookie("accessToken", token, { httpOnly: true}).status(200).send(info);

    } catch (err) {
        next(err);
    }
}

export const logout = async (req, res, next) => {
    res.clearCookie("accessToken", { sameSite: "none", secure: true}).status(200).send("User has been logged out");
}