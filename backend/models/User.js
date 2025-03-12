const mongoose=require('mongoose')
const UserDetails=new mongoose.Schema({
    name: String,
    passward: String,
    phone: String,
    email: String,
    id: String
})
module.exports=mongoose.module('User',UserDetails)
