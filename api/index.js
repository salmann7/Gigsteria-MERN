import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import deserializeUserP from "./middleware/deserializeUser.js";
import gigsRoutes from "./routes/gig.route.js";
import ordersRoutes from "./routes/order.route.js";
import profileRoutes from "./routes/profileRoutes.js";
import communityPostRoutes from "./routes/communityPost.route.js";
import notificationRoutes from "./routes/notification.route.js";
import reviewsRoutes from "./routes/review.route.js";
import awsRoutes from "./routes/aws.routes.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to mongodb");
    } catch (err) {
        console.log(err);
    }
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://gigsteria.onrender.com", credentials: true,}));

app.use(deserializeUserP);



app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/gigs", gigsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/communityPosts", communityPostRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/s3", awsRoutes);

app.use('/', (req, res, next ) =>{
    res.status(200).send("hello");
})

app.use((req, res, next) => {
    res.on('finish', () => {
      console.log(res.getHeaders());
    });
    next();
  });

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, async () => {
    await connectDb();
    console.log("server running on port 8800")
});