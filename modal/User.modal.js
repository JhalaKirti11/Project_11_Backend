import mongoose from "mongoose";

const User_Schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    status:{
        type: Boolean,
        enum: [true, false],
        default: true
    }
});

export const User = mongoose.model("user", User_Schema);