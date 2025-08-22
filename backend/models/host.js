const mongoose=require("mongoose");
const schema=mongoose.Schema;

const hostSchema=new schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true }
})

const hosts=mongoose.model("hosts",hostSchema);
module.exports=hosts;