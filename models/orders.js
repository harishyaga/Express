var mongoose=require('mongoose');
const { schema } = require('./product');

var orderSchema=new mongoose.Schema({

    userId:{type:String,required:true},
    productId:{type:String,required:true},
    productName:{type:String,required:true},
    productPrice:{type:Number,required:true},
    productDescription:{type:String,required:true},
    productImage:{type:String,required:true},
    userAddress:{type:String,required:true},
    userPhone:{type:String,required:true},
    userName:{type:String,required:true}


})

var Order=mongoose.model('order',orderSchema);

module.exports=Order;