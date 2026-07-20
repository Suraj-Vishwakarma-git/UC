import mongoose from "mongoose";

const movie=mongoose.model("movie",new mongoose.Schema({
    season:Number,
    name:String,
    number:Number,
    rating:Number,
    airdate:Date,
    summary:String,
}));

export default movie;
