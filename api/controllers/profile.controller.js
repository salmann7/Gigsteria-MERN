import communityPostModel from "../models/communityPost.model.js";
import gigModel from "../models/gig.model.js";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

export const getProfile = async ( req, res, next ) => {
    const userId = req.params.id;
    console.log("inside getprofile")
    let profileObj = {};

    try{
        const userObj = await userModel.findById(userId);
        let updatedUser = {...profileObj, userObj};
        profileObj = {...updatedUser};

        const commObj = await communityPostModel.find( {user: userId} );
        let updatedComm = {...profileObj, commObj};
        profileObj = {...updatedComm};

        const userGigObj = await gigModel.find({ user: userId});
        let updatedGig = {...profileObj, userGigObj};
        profileObj = {...updatedGig};

        const userOrderObj = await orderModel.find({
            ...(userObj.isSeller ? {sellerId: userObj._id} : {buyerId: userObj._id}),
            isCompleted: true,  
        });
        const orderLength = userOrderObj.length;
        let updatedOrder = {...profileObj, orderLength};
        profileObj = {...updatedOrder};

        res.status(200).send(profileObj);
    } catch(e){
        next(e);
    }
}