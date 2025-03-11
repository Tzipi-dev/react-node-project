const mongoose=require('mongoose')
const User = require('./User')
const FoundDetails=new mongoose.Schema({
     categiry: {
         type: String,
         enum: ['תכשיטים ושעונים', 'תיקים ומזוודות', 'ארנקים וכספים','טלפונים ואלקטרוניקה','יהדות','ביגוד','בעלי חיים','ציוד רפואי','אחר'], 
         default: 'אחר' 
       },
     name: String,
     city: String,
     street: String,
     owner: User,
     date: Date,
     identifying: Array,
})
module.exports=mongoose.module('Found',FoundDetails)
