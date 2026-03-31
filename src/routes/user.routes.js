const express=require("express");
const {userProtect, foodPartnerProtect}=require("../middlewares/auth.middleware.js")
const {registerUser, loginUser, logOutUser, registerFoodPartner, loginFoodPartner, logOutFoodPartner}=require("../controllers/auth.controller.js")
const router=express.Router();


//user routes
router.post("/user/register",registerUser)
router.post("/user/login",loginUser)
router.get("/user/logout",userProtect,logOutUser)

//food partner routes
 router.post("/foodpartner/register",registerFoodPartner)
 router.post("/foodpartner/login",loginFoodPartner)
 router.get("/foodpartner/logout",foodPartnerProtect,logOutFoodPartner)

module.exports= router