const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://paulswarnalee01:sp123@cluster0.381rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
 .then(()=>console.log("Connected to MongoDB"))
 .catch((err)=>console.log("Error connecting to MongoDB",err));
module.exports=mongoose.connection;