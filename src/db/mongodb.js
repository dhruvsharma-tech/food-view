const mongoose=require("mongoose");

const connectDB=async()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("mongoDB connected successfully");
    })
    .catch((error)=>{
        console.log("mongoDB error "+error)
    })
}

module.exports=connectDB;