import createError from "../utils/createError.js";
import orderModel from "../models/order.model.js";
import gigModel from "../models/gig.model.js";
import Stripe from "stripe";
import userModel from "../models/user.model.js";

export const checkout =  async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE);
    const YOUR_DOMAIN = 'http://localhost:3000/orders';
    // console.log(req);
    // const gig = await gigModel.findById(req.params.id);
    // console.log(gig);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {currency: 'inr', product_data: {name: req.body?.title}, unit_amount: req.body?.price * 100},
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/paymentsuccess?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    console.log(session);
    res.send({url: session.url});
  
    // res.redirect(303, session.url);
  };

export const intent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE);

    const gig = await gigModel.findById(req.params.id);
    const seller = await userModel.findById(gig.user);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    const newOrder = new orderModel({
        gigId: gig._id,
        img: gig.coverImageSrc,
        title: gig.title,
        buyerId: res.locals.user,
        sellerId: gig.user,
        sellerName: seller.name,
        price: gig.price,
        payment_intent: paymentIntent.id,
    });

    await newOrder.save();
    res.status(200).send({ clientSecret: paymentIntent.client_secret, paymentIntent})
}

export const getOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.find({
            ...(res.locals.user._doc.isSeller ? {sellerId: res.locals.user._doc._id} : {buyerId: res.locals.user._doc._id}),
            isCompleted: true,  
        });

        res.status(200).send(orders);
    } catch(err) {
        next(err);    
    }
}

export const confirm = async (req, res, next) => {
    try {
        const order = await orderModel.findOneAndUpdate({
            payment_intent: req.body.payment_intent,
        },{
            $set: {
                isCompleted: true,
            }
        });

        res.status(200).send("order has been confirmed");
    } catch(err) {
        next(err);
    }
}