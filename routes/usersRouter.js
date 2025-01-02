const express=require('express');
const router=express.Router();


const {registeruser,loginUser,logoutUser}=require('../controllers/authController');

router.get('/',(req,res)=>{
    res.send("hey this is users page");
});

router.post('/register',registeruser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);



module.exports=router;