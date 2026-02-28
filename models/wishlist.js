var mongoose=require("mongoose")

var wishlistScheme=mongoose.Schema({
    userid:{type:String,required:true},
     productName:{type:String,required:true},
     productId:{type:String,required:true},
    productPrice:{type:Number,required:true},
    productDescription:{type:String,required:true},
    productImage:{type:String,required:true}

})

var wishlist=mongoose.model('wishlist',wishlistScheme);

module.exports=wishlist;