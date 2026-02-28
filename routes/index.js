var express = require('express');
var router = express.Router();

var Cart=require("../models/carts");
var Order=require("../models/orders");

var Product=require("../models/product");
const { route } = require('./users');

router.get("/products",(req,res)=>{
  Product.find({})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err));
})

//.......to add...................

router.post("/add",(req,res)=>{
  let product=req.body;
  let newproduct=new Product(req.body);
  newproduct.save()
  .then(() => res.send({"status":"Added successfully....!"}))
  .catch(err => res.send(err));
})

//.........to addMany..........

router.post("/addMany",(req,res)=>{
  Product.insertMany(req.body)
  .then(()=>res.send({"status":"products added successfully..."}))
  .catch((err)=>console.log(err));
  
})


//.........to delete...................

router.delete("/delete/:id",(req,res)=>{
  var pid=req.params.id;
  Product.deleteOne({_id:pid})
  .then(()=> res.send({"status":"deleted successfullt....!"}))
  .catch((err)=>console.log(err));
  
})

//.............products less than Price.........

router.get("/lessthan",(req,res)=>{
  var maxPrice=req.query.price;
  Product.find({productPrice:{$lt:maxPrice}})
  .then((docs)=> res.send(docs))
  .catch((err)=>console.log(err));
})

//........products in range..............

router.get("/range",(req,res)=>{
  var maxprice=req.query.max;
  var minprice=req.query.min;
  Product.find({productPrice:{$gt:minprice,$lt:maxprice}})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})

router.get("/product",(req,res)=>{
  var pname=req.query.name;
  Product.find({productName:{$regex:pname}})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err));
})

router.get("/productById/:pid",(req,res)=>{
Product.findOne({_id:req.params.pid},{...req.body})
.then((docs)=>res.send(docs))
.catch((err)=>console.log(err));
})

//.......to ger products ascending order by name........

router.get("/ascproduct",(req,res)=>{
  var pname=req.query.name;
  Product.find().sort({productName:1})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err));
})

//..........sort............

router.get("/sort",(req,res)=>{
var orderbyname=req.query.ordername;
var order1=req.query.order

Product.find().sort({[orderbyname]:order1=="asc"?1:-1})
.then((docs)=>res.send(docs))
.catch((err)=>console.log(err))

})

//    pagination?page=1&limit=5
router.get("/pagination",(req,res)=>{
  var pageNo=req.query.page;
  var limit1=req.query.limit;
  var skippage=(pageNo-1)*limit1;
  Product.find().skip(skippage).limit(limit1)
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err));
})




//...............update..........
 router.put("/update",(req,res)=>{
    Product.findOneAndUpdate({_id:req.body._id},{...req.body})
    .then((docs)=>res.send({"status":"updated successfully......"
    }))
    .catch((err)=>console.log(err))

 })


 router.post("/addtocart",(req,res)=>{
  Cart.create(req.body)
  .then(()=>res.send({"status":"Added to Cart successfully...."}))
  .catch((err)=>console.log(err))
 })

 router.get("/mycart/:uid",(req,res)=>{
  Cart.find({userId:req.params.uid})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err));
 })

 router.delete("/deleteCartItem/:cid",(req,res)=>{
  Cart.deleteOne({_id:req.params.cid})
  .then(()=>res.send({"status":"deleted successfully...."}))
  .catch((err)=>console.log(err));
 })

 router.get("/panalysis/:pid",(req,res)=>{
  Cart.find({productId:req.params.pid})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err));
 })

 router.post("/addtOrder",(req,res)=>{
  Order.create(req.body)
  .then(()=>res.send({"status":"ordered successfully...."}))
  .catch((err)=>console.log(err));
 })

 router.get("/getOrders/:uid",(req,res)=>{
  Order.find({userId:req.params.uid}).then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
 })

 

module.exports = router;