const express=require('express');
const router=express.Router();
const ownerModel=require('../models/ownerModel');

router.get('/',(req,res)=>{
    res.send("hey this is owners page");
});

if(process.env.NODE_ENV==='development'){
router.post('/addOwner',async(req,res)=>{
    try{
        const owners=await ownerModel.find();
        if(owners.length>0){
            return res.status(500).send("Owner already exists,you don't have permission to create owner");
           
        }
        let {fullname,email,password}=req.body;
        const createdOwner=await ownerModel.create({
            fullname,
            email,
            password
            
        });
        await createdOwner.save();
        res.status(201).send(createdOwner);
    }
    catch(err){
        res.status(500).send(err);
    }
});
}


module.exports=router;