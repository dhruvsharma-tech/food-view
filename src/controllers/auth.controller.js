const User = require("../models/user.modle.js");
const foodPartner= require("../models/foodPartner.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET, {
      expiresIn: process.env.JWT_USER_EXPIRY,
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("userToken", token, options);
    res.status(201).json({
      success: true,
      message: "user register successfully",
      token,
      user: {
        fullname,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_USER_SECRET,
      {
        expiresIn: process.env.JWT_USER_EXPIRY,
      },
    );

    const option = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("userToken", token, option);
    res.status(200).json({
      success: true,
      message: "user loggedIn successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("userToken", options);
    res.status(200).json({
        success:true,
        message:"user LoggedOut Successfully"
    })
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
  }
};

const registerFoodPartner=async(req,res)=>{
  try {
    const {name,email,password}=req.body;

    if(!name?.trim() || !email?.trim() || !password?.trim()){
        return res.status(400).json({
            message:"all fields are required"
        })
    }

    const existedFoodPartner= await foodPartner.findOne({email})

    if(existedFoodPartner){
        return res.status(400).json({
            message:"food partner already exist"
        })
    } 

    const hashPassword= await bcrypt.hash(password,10)

    const foodpartner= await foodPartner.create({
        name,
        email,
        password:hashPassword
    })

    const token= jwt.sign({id:foodpartner._id},process.env.JWT_FOODPARTNER_SECRET,{
        expiresIn:process.env.JWT_FOODPARTNER_EXPIRY
    })

    const options={
      httpOnly:true,
      secure:true   
    }

    res.cookie("fpToken",token,options)
    res.status(201).json({
        success:true,
        message:"food partner register successfully",
        token,
        foodpartner:{
            name,
            email
        }
    })    
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })  
  }
}

const loginFoodPartner=async(req,res)=>{
  try {
    const {email,password}=req.body;

    if(!email?.trim() || !password?.trim()){
        return res.status(400).json({
            message:"all fields are required"
        })
    }

    const foodpartner= await foodPartner.findOne({email})

    if(!foodpartner){
        return res.status(400).json({
            message:"food partner not found"
        })
    } 

    const isPasswordCorrect= await bcrypt.compare(password,foodpartner.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"incorrect password"
        })
    }

    const token= jwt.sign({id:foodpartner._id},process.env.JWT_FOODPARTNER_SECRET,{
        expiresIn:process.env.JWT_FOODPARTNER_EXPIRY
    })

    const options={
        httpOnly:true,
        secure:true
    }  
    res.cookie("fpToken",token,options)
    res.status(200).json({
        success:true,
        message:"food partner loggedIn successfully",
        foodpartner
    })

  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })    
  }
} 

const logOutFoodPartner=async(req,res)=>{
  try {
    const options={
        httpOnly:true,
        secure:true
    }
    res.clearCookie("fpToken", options)
    res.status(200).json({
        success:true,
        message:"food partner loggedOut successfully"
    })  
  } catch (error) {
    
  }
}

module.exports = { registerUser, loginUser, logOutUser, registerFoodPartner, loginFoodPartner, logOutFoodPartner} ;
