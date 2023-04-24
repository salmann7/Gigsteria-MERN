import mongoose from "mongoose";
const { Schema } = mongoose;

const sessionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    valid: {
        type: Boolean,
        default: true
    },
    userAgent: {
        type: String
    },
},{
    timestamps: true,
});

export default mongoose.model("Session", sessionSchema);