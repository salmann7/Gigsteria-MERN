import notificationModel from "../models/notification.model.js";

export const getNotifications = async ( req, res, next ) => {
    const userId = res.locals.user._doc._id;
    try{
        const noti = await notificationModel.find({user: userId});
        res.status(200).send(noti);
    } catch(e){
        next(e);
    }
}