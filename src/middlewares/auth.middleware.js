const jwt =require("jsonwebtoken");
const User = require("../models/user.modle.js");
const FoodPartner = require("../models/foodPartner.model.js");

const userProtect=async(req,res,next)=>{
    try {
        const token= req.cookies.userToken;

    if(!token){
        return res.status(400).json({
            message:"token not found"
        })
    }

    const decoded=jwt.verify(token,process.env.JWT_USER_SECRET)

    const user= await User.findOne({_id: decoded.id})

    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }

    req.user=user

    next();
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const foodPartnerProtect= async(req,res,next)=>{
    try {
        const token=req.cookies.fpToken

        if(!token){
            return res.status(400).json({
                message:"please login first"
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_FOODPARTNER_SECRET)

        const foodPartner=await FoodPartner.findOne({_id:decoded.id})

        if(!foodPartner){
            res.status(400).json({
                message:"food-partner not found"
            })
        }

        req.foodPartner=foodPartner;

        next();
    } catch (error) {
        
    }
}
module.exports={userProtect,foodPartnerProtect}