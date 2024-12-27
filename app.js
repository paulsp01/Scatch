const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const path=require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.send("hello world");
});

app.listen(3003,()=>{
console.log("your port is running on 3003");
});