const mongoose=require('mongoose')
const UserDetails=new mongoose.Schema({
    name: String,
    passward: String,
    phone: String,
    email: String,
   
})
module.exports=mongoose.model('User',UserDetails)
