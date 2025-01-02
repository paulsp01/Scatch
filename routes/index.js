const express=require('express');
const router=express.Router();
const {isLoggedin}=require('../middlwares/isLoggedin');
const productModel=require('../models/productModel');
const userModel=require("../models/userModel");

router.get('/',(req,res)=>{
    let error=req.flash("error");
    let success=req.flash("success");
    res.render('index',{error,loggedin:false,success});
});

router.get('/shop',isLoggedin,async (req,res)=>{
    let products=await productModel.find();
    let success=req.flash("success");
   return res.render('shop',{products,success});
});

router.get('/cart',isLoggedin,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("cart");
 
    const initialCounter = 1; 
  
    res.render('cart',{user, counter: initialCounter });
});



router.get('/addToCart/:id',isLoggedin,async (req,res)=>{
    let user=await userModel.findOne({email:req.user.email});
    
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","product added to cart");
     res.redirect("/shop");

   
});

router.get('/logout',isLoggedin,(req,res)=>{
    res.render('shop');
});


module.exports=router;