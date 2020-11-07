const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({

    title:String,
    description:String,
    disPrice:Number,
    oriPrice:Number,
    stock:Number,
    seller:String,
    image:{
        type: Buffer
    }

})

module.exports = mongoose.model('products',ProductSchema);