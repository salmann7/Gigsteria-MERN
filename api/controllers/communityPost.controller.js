import communityPostModel from "../models/communityPost.model.js";

export const getPost = async ( req, res, next ) => {
    const userId = req.params.id;
    
    try{
        const userPosts = await communityPostModel.find({ user: userId });

        if(!userPosts) return res.status(200).send("currently no posts are present");

        res.status(200).send({userPosts});
    } catch(e){
        next(e);
    }
}

export const createPost = async ( req, res, next ) => {
    const userId = res.locals.user._doc._id;

    try {
        const newPost = new communityPostModel({
            user: userId,
            desc: req.body.desc,
        });
        const savedPost = await newPost.save();
        res.status(201).send({savedPost});
    } catch(e){
        next(e);
    }
}