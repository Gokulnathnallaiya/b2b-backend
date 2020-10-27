const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

    name:String,
    description:String,
    price:Number,
    stock:Number,

})

module.exports = mongoose.model('products',ProductSchema);