const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

    name:String,
    description:String,
    price:Number,
    stock:Number,
    seller:String,
    image:{
        type: Buffer
    }

})

module.exports = mongoose.model('products',ProductSchema);