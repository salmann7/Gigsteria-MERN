import createError from "../utils/createError.js";
import reviewModel from "../models/review.model.js";
import gigModel from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
    if(req.isSeller) return next(createError(403, "Seller cannot create a review"));
    
    const newReview = new reviewModel({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
    });

    try {
        const review = await reviewModel.findOne({
            gigId: req.body.gigId,
            userId: req.userId,
        });

        if(review) return next(createError(403, "You have already created a review for this gig"));

        const savedReview = await newReview.save();

        await gigModel.findByIdAndUpdate( req.body.gigId, {
            $inc : {
                totalStars: req.body.start, starNumber: 1
            }
        });

        res.status(201).send(savedReview);
    } catch(err) {
        next(err);
    }
}

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await reviewModel.find({ gigId: req.params.gigId});

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