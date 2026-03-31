const mongoose=require("mongoose");

const foodpartnerSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
         type:String,
        require:true,
    }
},{timestamps:true})

const foodPartner = mongoose.model("foodpartner",foodpartnerSchema)

module.exports=foodPartner  