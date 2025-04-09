import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    category: String,
    price: Number,
    stock: Number,
    description: String,
    brand: String,
    discount: Number,
    availability: String,
    name: String,    
    userId: String
}, {timestamps: true})


const model = mongoose.model('Product', ProductSchema)

export default model;

