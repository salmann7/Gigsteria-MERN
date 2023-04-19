import createError from "../utils/createError";
import orderModel from "../models/order.model";
import gigModel from "../models/gig.model";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE);

    const gig = await gigModel.findById(req.params.id);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    const newOrder = new orderModel({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id,
    });

    await newOrder.save();
    res.status(200),send({ clientSecret: paymentIntent.client_secret})
}

