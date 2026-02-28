var express = require('express');
var router = express.Router();

var token=require('jsonwebtoken');
var nodemailer=require('nodemailer')

var bcrypt=require('bcrypt')

var User=require('../models/users');
const wishlist = require('../models/wishlist');

router.get("/viewusers",(req,res)=>{
  User.find({})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})

router.post("/registration",(req,res)=>{
  User.findOne({username:req.body.username})
  .then(async(data)=>{
    if(data){
      res.send("user already existed...")
    }
    else{
    User.create({
      ...req.body,
      password:await bcrypt.hash(req.body.password,10)
    })
    .then(()=>res.send({"status":"registration successfull...."}))
    .catch((err)=>console.log(err))

    var transporter=nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:'hariprasadshyaga82@gmail.com',
        pass:process.env.passkey
      }
    })

    var mailOptions={
      from:'hariprasadshyaga82@gmail.com',
      to:req.body.email,
      subject:"Registration succesfull",
      text:`Hi ${req.body.username},
       Thanks for creating an account with Mastan pvt.Ltd We are excited to have you on board. To get started, please click the button below to verify your email address. your password is : ${req.body.password} Once verified, you can log in and start exploring`
    }
    transporter.sendMail(mailOptions,(err)=>{
      if(err){
        console.log("mail not sent please verify...")
      }
      else{
        console.log("email sent successfully...")
      }
    })

    }
  })
})

router.post("/login",(req,res)=>{
  User.findOne({username:req.body.username})
  .then(async(dbuser)=>{
    if(dbuser){
      if(await bcrypt.compare(req.body.password,dbuser.password)){

        const jwttoken=token.sign({userId:dbuser._id},process.env.SECRET,{expiresIn:'1hr'});

        res.send({"status":"login successful....",
          "token":jwttoken,
          "userId":dbuser._id,
          "role":dbuser.role
      })  
      }
      else{
        res.send({"status":"incorrect usename or password"})
      }

    }
    else{
      res.send({"status":"user not found please register.....!"})
    }
  })
})

router.patch("/update",(req,res)=>{
  User.findOneAndUpdate({_id:req.body._id},{...req.body})
  .then((docs)=>res.send({"status":"updated successfully"}))
  .catch((err)=>console.log(err))
})

router.post("/addtowishlist/:userid",(req,res)=>{
  var userId=req.params.userid;
  wishlist.create({
    ...req.body,
    userid:userId
  })
  .then((docs)=>res.send({"status":"added successfully...."}))
  .catch((err)=>console.log(err))
})

router.post("/addToCart/:pid",(req,res)=>{
    var userId=req.params.userid;
    
    

})







module.exports = router;
