const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://paulswarnalee01:sp123@cluster0.381rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const userSchema=mongoose.Schema({

fullname:String,
email:String,
password:String,
cart:{
    type:Array,
    default:[]
},
isAdmin:Boolean,
orders:{
    type:Array,
    default:[]
},
contact:Number,
picture:String

});

module.exports=mongoose.model("user",userSchema);