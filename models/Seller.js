const mongoose = require('mongoose');

const SellerSchema = mongoose.Schema({

    sellerName:String,
    Location:String,
    ProfitPercentage:Number,
    SupportEmail:String,

})

module.exports = mongoose.model('vendors',SellerSchema);