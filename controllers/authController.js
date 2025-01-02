const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const {generateToken}=require('../utils/generatetoken');
const userModel=require('../models/userModel');

module.exports.registeruser=async (req,res)=>{
    try{
   let {fullname,email,password}=req.body;
   let user=await userModel.findOne({email});
    if(user){
         return req.flash("error","user already exists");
    }else{

        bcrypt.genSalt(10,  function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err){
                    return res.status(500).send(err.message);
                }else{
                    let createdUser=await userModel.create({fullname,email,password:hash});
                    
                

                
                    let token=generateToken(createdUser);
                        res.cookie("token",token);
                        req.flash("success","user created successfully");
                        res.redirect("/");
                    
                
            }
            });
        });
        
        
    }
}catch(err){
  
    res.status(500).send(err.message);
}

}


module.exports.loginUser=async (req,res)=>{
   try{
        let {email,password}=req.body;
        let user=await userModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    return res.status(500).send(err.message);
                }else if(result){
                    let token=generateToken(user);
                    res.cookie("token",token);
                 
                    req.flash("success","login successfull");
                    return res.redirect("/shop");
                }else{
                    req.flash("error","email or password is not valid");
                    return res.redirect("/");
                }
            })
        
        }else{
            req.flash("error","email or password is not valid");
            return res.redirect("/");
        }
    }catch(err){
        res.status(500).send(err.message);
    };
}

module.exports.logoutUser=(req,res)=>{  
    res.clearCookie("token");
   res.redirect("/");
}