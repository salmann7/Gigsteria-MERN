import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    totalStars: {
        type: Number,
        required: false,
        default: 0,
    },
    starNumber: {
        type: Number,
        required: false,
        default: 0,
    },
    cat: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cover: {
        type: String,
        required: false,
    },
    images: {
        type: [String],
        required: false,
    },
    shortTitle: {
        type: String,
        required: false,
    },
    shortDesc: {
        type: String,
        required: false,
    },
    deliveryTime: {
        type: Number,
        required: false,
    },
    revisionNumber: {
        type: Number,
        required: false,
    },
    features: {
        type: [String],
        required: false,
    },
    sales: {
        type: Number,
        required: false,
        default: 0,
    },
},{
    timestamps: true,
});

export default mongoose.model("Gig", GigSchema);