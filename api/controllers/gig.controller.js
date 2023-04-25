import gigModel from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
    console.log(res.locals.user._doc.isSeller)
    if(!res.locals.user._doc.isSeller) return next(createError(403, "Only sellers can create a gig"));
    
    const newGig =  new gigModel({
        user: res.locals.user._doc._id,
        ...req.body,
    });

    try {
        const savedGig = await newGig.save();
        res.status(201).send(savedGig);
    } catch (err) {
        next(err);
    }
}

export const deleteGig = async (req, res, next) => {
    try {
        const existingGig = await gigModel.findById(req.params.id);

        if( existingGig.user !== res.locals.user._doc._id ) return next(createError(403, "You can only delete your gig"));

        await gigModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getGig = async (req, res, next) => {
    try {
        const gig = await gigModel.findById(req.params.id);
        if(!gig) next(createError(404, "Gig not found"));

        res.status(200).send(gig);
    } catch (err) {
        next(err);
    }
}

export const getGigs = async (req, res, next) => {
    const q = req.query;

    const filters = {
        ...(q.userId && { userId: q.userId}),
        ...(q.cat && { cat: q.cat}),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gt: q.min}),
                ...(q.max && { $lt: q.max}),
            },
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i"}}),
    }

    try {
        const gigs = await gigModel.find(filters).sort({ [q.sort]: -1});
        res.status(200).send(gigs);
    } catch(err) {
        next(err);
    }
}