import userModel from "../models/user.model.js";
import sessionModel from "../models/session.model.js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import qs from 'qs';
import axios from 'axios';

const CLIENT_URL = process.env.NODE_ENV === 'production'
  ? 'https://gigsteria.onrender.com'
  : 'http://localhost:3000';

const accessTokenCookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: false,
    domain: process.env.NODE_ENV === 'production' ? '.onrender':'localhost',
    path: "/",
    sameSite: "none",
    secure: true,
};

const refreshTokenCookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 year
};

// export const register = async (req, res, next) => {
//     try {
//         const hashPassword = bcrypt.hashSync(req.body.password, 5);
//         const newUser = new userModel({
//             ...req.body,
//             password: hashPassword,
//         });

//         await newUser.save();
//         res.status(201).send("User has been created");

//     } catch (err) {
//         next(err);
//     }
// }

export const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({email: req.body.email});

        if(!user) return next(createError(401, "Invalid email or password"));

        const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);

        console.log(isCorrectPassword)

        if(!isCorrectPassword) return next(createError(401, "Invalid emailor password"));

        const session = await sessionModel.create({ user: user._id, userAgent: req.get("user-agent") || ''});



        const accessToken = jwt.sign(
            {
                ...user,
                session: session._id, 
            },
            process.env.JWT_KEY,
            {
                expiresIn: 900000,
            }
        );
        const refreshToken = jwt.sign(
            {
                ...user,
                session: session._id, 
            },
            process.env.JWT_KEY,
            {
                expiresIn: 3.154e10,
            }
        );
        // console.log("accessTokenCookieOptions: ", accessToken);
        // console.log("refreshTokenCookieOptions: ", refreshTokenCookieOptions);

        // res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        // res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        // console.log("Cookies set successfully");

        return res.status(200).send({ accessToken, refreshToken});
        // const { password, ...info} = user._doc;

        // res.cookie("accessToken", token, { httpOnly: true}).status(200).send(info);

    } catch (err) {
        next(err);
    }
}

export const getUserSessionHandler = async ( req, res, next) => {
    const userId = res.locals.user._id;

    const sessions = await sessionModel.findOne({ user: userId, valid: true});

    return res.send(sessions);
}

export const googleOauthHandler = async ( req, res, next ) => {
    console.log("inside google oauth");
    const code = req.query.code;
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret:process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri:process.env.GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: "authorization_code"
    };
    let id_tokend;
    let access_tokend;
    let googleUserd;

    try {
        try{
            const resTokensObj = await axios.post( 
                url, 
                qs.stringify(values),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
            const {id_token, access_token } = resTokensObj.data;
            id_tokend = id_token;
            access_tokend = access_token;
            // console.log("accesstoken")
            // console.log(access_token );
        } catch (e){
            console.log(e);
        }

        try{
            const resGoogleUserObj = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_tokend}`,
                {
                    headers: {
                        Authorization: `Bearer ${id_tokend}`,
                    }
                }
            )
    
            // const { googleUser } = resGoogleUserObj.data;
            googleUserd = resGoogleUserObj.data
            // console.log("googleuser")
            // console.log(resGoogleUserObj.data);
        } catch(e){
            console.log(e);
        }
        
        if(!googleUserd.verified_email){
            return res.status(403).send("Google account is not verified");
        }

        // let user;
        // const existingUser = await userModel.findOne({ email: googleUserd.eamil });
        // if(existingUser){
        //     console.log("exisiitng user");
        //     user = await userModel.findOneAndUpdate(
        //         {
        //             email: googleUserd.eamil,
        //         },
        //         {
        //             email: googleUserd.email,
        //             name: googleUserd.name,
        //             picture: googleUserd.picture,
        //         },
        //         {
        //             new: true,
        //         }
        //     );
        // } else {
        //     user = await userModel.create({
        //         email: googleUserd.email,
        //         name: googleUserd.name,
        //         picture: googleUserd.picture,
        //     })
        // }
        const user = await userModel.findOneAndUpdate(
            {
                email: googleUserd.email,
            },
            {
                email: googleUserd.email,
                name: googleUserd.name,
                picture: googleUserd.picture,
            },
            {
                upsert: true,
                new: true,
            }
        );

        console.log(user);
        const session = await sessionModel.create({ user: user._id, userAgent: req.get("user-agent") || ''});

        const accessToken = jwt.sign(
            {
                ...user,
                session: session._id, 
            },
            process.env.JWT_KEY,
            {
                expiresIn: 900000,
            }
        );
        const refreshToken = jwt.sign(
            {
                ...user,
                session: session._id, 
            },
            process.env.JWT_KEY,
            {
                expiresIn: 3.154e10,
            }
        );

        // res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        // res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        // res.status(200).send({ accessToken, refreshToken});

        res.redirect(`${CLIENT_URL}/?accesstoken=${accessToken}&refreshtoken=${refreshToken}`);

    } catch(e) {
        next(e)
        throw new Error(e);
    }
}

export const logout = async (req, res, next) => {
    res.clearCookie("refreshToken", { sameSite: "none", secure: true})
    res.clearCookie("accessToken", { sameSite: "none", secure: true})
    res.status(200).send("User has been logged out");
}