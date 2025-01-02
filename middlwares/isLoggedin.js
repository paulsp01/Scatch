const jwt=require('jsonwebtoken');
const userModel=require('../models/userModel');

module.exports.isLoggedin=async (req,res,next)=>{
    try{
        let token=req.cookies.token;
        if(token){
            let decoded=jwt.verify(token,process.env.JWT_KEY);
            let user=await userModel.findOne({email:decoded.email}).select("-password");
            if(user){
                req.user=user;
                next();
            }else{
                req.flash("error","user not found");
               
            }
        }else{
            req.flash("error","you need to login first");
            return res.redirect("/");
        }
    }catch(err){
        req.flash("error","something went wrong");
        res.status(500).send(err.message);
    }
}

