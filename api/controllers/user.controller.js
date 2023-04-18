import userModel from "../models/user.model";
import createError from "../utils/createError";

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