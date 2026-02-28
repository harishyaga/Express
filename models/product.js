var mongoose=require('mongoose');

var productsSchema=new mongoose.Schema({
    productName:{type:String,required:true},
    productPrice:{type:Number,required:true},
    productDescription:{type:String,required:true},
    productImage:{type:String,required:true}

});
var Product=mongoose.model('product',productsSchema);
module.exports=Product;