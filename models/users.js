var mongoose = require("mongoose");

var userSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
});

var User=mongoose.model('user',userSchema);
module.exports=User;