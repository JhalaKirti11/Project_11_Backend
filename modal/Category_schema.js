import mongoose from "mongoose";

const Category_schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isDelete: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
})

export const Category = mongoose.model('category', Category_schema);