import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

export default mongoose.model("Notification", notificationSchema);