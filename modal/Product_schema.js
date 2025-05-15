import mongoose from 'mongoose';

const Product_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    size: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        enum:[true, false],
        default: true
    }
})

export const Product = mongoose.model('product', Product_schema);