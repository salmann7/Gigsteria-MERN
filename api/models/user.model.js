import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
    isSeller: {
        type: Boolean,
        default:true,
    },
    favoriteIds: {
        type: Array,
        required: false
    },
    role: {
        type: String,
        required: false,
    },
    skills: {
        type: Array,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    followerIds: {
        type: Array,
        required: false
    },
    followingIds: {
        type: Array,
        required: false
    },
    hasNotification: {
        type: Boolean,
        default:false,
    },
},{
    timestamps: true
});

export default mongoose.model("User", userSchema);

