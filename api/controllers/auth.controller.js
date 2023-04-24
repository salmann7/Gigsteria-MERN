import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const accessTokenCookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
};

const refreshTokenCookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 year
};

// export const register = async (req, res, next) => {
//     try {
//         const hashPassword = bcrypt.hashSync(req.body.password, 5);
//         const newUser = new userModel({
//             ...req.body,
//             password: hashPassword,
//         });

//         await newUser.save();
//         res.status(201).send("User has been created");

//     } catch (err) {
//         next(err);
//     }
// }

export const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({username: req.body.username});

        if(!user) return next(createError(401, "Invalid email or password"));

        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        console.log(isCorrectPassword)

        if(!isCorrectPassword) return next(createError(401, "Invalid emailor password"));

        const session = await sessionModel.create({ user: user._id, userAgent: req.get("user-agent") || ''});



        const accessToken = jwt.sign(
            {
                ...user,
                session: session._id, 
            },
            process.env.JWT_KEY,
            {
                expiresIn: 900000,
            }
        );
        const refreshToken = jwt.sign(
            {
                ...user,
                session: session._id, 
            },
            process.env.JWT_KEY,
            {
                expiresIn: 3.154e10,
            }
        );

        res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

        return res.status(200).send({ accessToken, refreshToken});
        // const { password, ...info} = user._doc;

        // res.cookie("accessToken", token, { httpOnly: true}).status(200).send(info);

    } catch (err) {
        next(err);
    }
}

export const logout = async (req, res, next) => {
    res.clearCookie("accessToken", { sameSite: "none", secure: true}).status(200).send("User has been logged out");
}