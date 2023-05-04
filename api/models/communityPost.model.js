import mongoose from "mongoose";
const { Schema } = mongoose;

const communityPostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    desc: {
        type: String,
        default: true
    }
},{
    timestamps: true,
});

export default mongoose.model("CommunityPost", communityPostSchema);