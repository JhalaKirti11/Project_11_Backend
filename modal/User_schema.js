// import mongoose from "mongoose";

// const User_Schema = mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     image:{
//         type:String
//     },
//     status:{
//         type: Boolean,
//         enum: [true, false],
//         default: true
//     }
// });

// export const User = mongoose.model("user", User_Schema);



import mongoose from "mongoose";
// import {Chat} from './Chat_schema.js';

const Chat_schema = mongoose.Schema({
    type: String,
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum:['send', 'received'],
        default: 'send'
    }
});

// =========================================================

const User_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    notification: [Chat_schema],
    status: {
        type: Boolean,
        enum: [true, false],
        default: true
    }
})

export const User = mongoose.model('user', User_schema);
export const Chat = mongoose.model('chat', Chat_schema);
