const mongoose=require("mongoose");
const dbgr=require("debug")("development:mongoose");
const config=require("config");
const { username, password, host, options } = config.get("db");

const uri = `mongodb+srv://${username}:${password}@${host}/${options}`;
mongoose.connect(uri)
 .then(()=>dbgr("Connected to MongoDB"))
 .catch((err)=>dbgr("Error connecting to MongoDB",err));
module.exports=mongoose.connection;