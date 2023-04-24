import _ from 'lodash';
const { get } = _;
import jwt from 'jsonwebtoken';


const deserializeUserP = async ( req, res, next ) => {
    console.log(req.cookies);
    const accessToken = get(req, "cookies.accessToken") || get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

    if(!accessToken){
        console.log("here");
        console.log(accessToken);
        return next();
    }
    console.log(accessToken);

    const decoded = jwt.verify( accessToken, process.env.JWT_KEY);
    const decodedObj = {
        valid: true,
        expired: false,
        decoded
    }

    if(decoded){
        res.locals.user = decoded;
        return next();
    }
}

export default deserializeUserP;
