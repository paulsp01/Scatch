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
}],

orders:[
    {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1, // Default to 1 if not provided
        },
        orderedAt: {
          type: Date,
          default: Date.now,
        },
        paymentStatus: {
          type: String,
          enum: ["Pending", "Completed", "Failed"],
          default: "Pending",
          required: true,
        },
      },
    ],

contact:Number,
picture:String

});

module.exports=mongoose.model("user",userSchema);