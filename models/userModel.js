const mongoose=require("mongoose");


const userSchema=mongoose.Schema({

fullname:{
    type:String,
    required:true,
    minlength:3,
    trim:true
    },
email:String,
password:String,
cart:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product"
}
],

orders:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    ],

contact:Number,
picture:String

});

module.exports=mongoose.model("user",userSchema);