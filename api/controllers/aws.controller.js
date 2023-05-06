import { generateUploadURL } from "../utils/s3.js"

export const getUrl = async ( req, res, next ) => {
    try{
        const url = await generateUploadURL();
        res.status(200).send({url})
    } catch(e){
        console.log(e);
    }
}