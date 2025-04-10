import mongoose from "mongoose";

const User_Schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
});

export const User = mongoose.model("user", User_Schema);