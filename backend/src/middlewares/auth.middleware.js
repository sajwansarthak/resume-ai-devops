const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })

    console.log("Blacklisted:",isTokenBlacklisted)

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is invalid"
        })
    }

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded:",decoded)

        req.user = decoded

        next()
    }catch(err){
        console.log("JWT Error:", err.message);
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    authUser
}