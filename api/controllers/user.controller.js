// import userModel from "../models/user.model";
import notificationModel from "../models/notification.model.js";
import userModel from "../models/user.model.js";

import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
// import { omit } from 'lodash';

export const register = async (req, res, next) => {
    try {
        const genSalt = await bcrypt.genSalt(10);
        const hashPassword = bcrypt.hashSync(req.body.password, genSalt);
        const newUser = new userModel({
            ...req.body,
            password: hashPassword,
        });
        const user = await newUser.save();
        // res.status(201).send(omit(user.toJSON(), "password"));
        res.status(201).send(user);

    } catch (err) {
        next(err);
    }
}

export const getCurrentUser = async ( req, res, next ) => {
    return res.send(res.locals.user);
}

export const getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);

        res.status(200).send(user);
    } catch (err) {
        return next();
    }
}

export const deleteUser = async (req, res, next) => {
    const user = await userModel.findById(req.params.id);

    if(req.userId !== user._id.toString()) {
        return next(createError(403, "You can delete only your account"));
    }
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send("user deleted");
}

export const addFav = async (req, res, next) => {

    await userModel.findByIdAndUpdate(req.body._id, {
        $addToSet: { favoriteIds: req.params.id }
    },
    { new: true});
    res.status(200).send("added to favorite");
}

export const deleteFav = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.body._id, {
            $pull: { favoriteIds: req.params.id }
        }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
}

export const updateUser = async ( req, res, next ) => {
    const userId = res.locals.user._doc._id;
    try{
        const updatedUser = await userModel.findByIdAndUpdate( userId, req.body, { new: true,});
        res.status(200).send(updatedUser);
    }catch(e){
        next(e);
    }
}

export const addFollower = async ( req, res, next ) => {
    const userId = req.params.id;
    const myId = res.locals.user._doc._id;
    try{
        const updatedUser = await userModel.findByIdAndUpdate( userId, {
            $push: {
                followerIds: myId,
            },
            hasNotification: true,
        }, { new: true,});
        const myUser = await userModel.findByIdAndUpdate( myId, {
            $push: {
                followingIds: userId,
            }
        },{ new: true}  );
        const newNoti = new notificationModel.create({
            user: userId,
            body: `${res.locals.user._doc.name} started following you`
        });
        newNoti.save();
        res.status(200).send(updatedUser);
    }catch(e){
        next(e);
    }
}

export const removeFollower = async ( req, res, next ) => {
    const userId = req.params.id;
    const myId = res.locals.user._doc._id;
    try{
        const updatedUser = await userModel.findByIdAndUpdate( userId, {
            $pull: {
                followerIds: myId,
            },
            hasNotification: true,
        }, { new: true,});
        const myUser = await userModel.findByIdAndUpdate( myId, {
            $pull: {
                followingIds: userId,
            }
        },{ new: true}  );
        const newNoti = new notificationModel.create({
            user: userId,
            body: `${res.locals.user._doc.name} has unfollowed you`
        });
        newNoti.save();
        res.status(200).send(updatedUser);
    }catch(e){
        next(e);
    }
}