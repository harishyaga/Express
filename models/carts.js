var mongoose=require('mongoose');

var cartSchema=mongoose.Schema({
    userId:{type:String,required:true},
    productId:{type:String,required:true},
    productName:{type:String,required:true},
    productPrice:{type:Number,required:true},
    productDescription:{type:String,required:true},
    productImage:{type:String,required:true}

});

var Cart=mongoose.model('cart',cartSchema);

module.exports=Cart;