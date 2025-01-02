const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const path=require('path');

const dotenv=require('dotenv');
dotenv.config();

const expressSession=require('express-session');
const flash=require('connect-flash');

const db=require('./config/mongoose');
const ownersRouter=require('./routes/ownersRouter');
const usersRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const indexRouter=require('./routes/index');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession({
    secret:process.env.JWT_KEY,
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}));
app.use(flash());

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.use('/',indexRouter);



app.listen(3003,()=>{
console.log("your port is running on 3003");
});