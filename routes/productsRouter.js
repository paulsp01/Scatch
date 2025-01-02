const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const productModel=require('../models/productModel');

router.post('/create',upload.single("image"),async (req,res)=>{
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        const image = req.file.buffer;

        const product = await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image
        });
        req.flash('success', 'Product created successfully');
        return res.redirect('/owners/admin');
    }catch (err) {
        req.flash('error', 'Error creating product');
        return res.redirect('/owners/admin');
    }
});


module.exports=router;