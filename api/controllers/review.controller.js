import createError from "../utils/createError.js";
import reviewModel from "../models/review.model.js";
import gigModel from "../models/gig.model.js";
import userModel from "../models/user.model.js";

export const createReview = async (req, res, next) => {
    // if(req.isSeller) return next(createError(403, "Seller cannot create a review"));

    const userReview = await userModel.findById(res.locals.user._doc._id);
    
    const newReview = new reviewModel({
        user: res.locals.user._doc._id,
        gig: req.body.id,
        desc: req.body.desc,
        star: req.body.star,
        userName: userReview?.name,
    });

    try {
        const review = await reviewModel.findOne({
            gig: req.body.id,
            user: res.locals.user._doc._id,
        });

        if(review) return next(createError(403, "You have already created a review for this gig"));

        const savedReview = await newReview.save();

        // await gigModel.findByIdAndUpdate( req.body.id, {
        //     $inc : {
        //         totalStars: req.body.star, starNumber: 1
        //     }
        // });

        res.status(201).send(savedReview);
    } catch(err) {
        next(err);
    }
}

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await reviewModel.find({ gig: req.params.gigId});

        res.status(200).send(reviews);
    } catch(err) {
        next(err);
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        const existingReview = await reviewModel.findById(req.params.id);

        if(!existingReview) return next(createError(404, "Review not found"));

        if(existingReview.userId !== req.userId) return next(createError(403, "You can only delete your review"));

        await reviewModel.findByIdAndDelete(req.params.id);

        res.status(200).send("deleted review");
    } catch(err) {
        next(err);
    }
}