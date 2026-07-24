import mongoose from "mongoose";


const connectDB=async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Unicode");
        console.log("MongoDB connected");
    }catch(e){
        console.log("error" + e);
        process.exit(1);
    }
}

export default connectDB;