const mongoose=require('mongoose')
const User = require('./User')
const LostDetails=new mongoose.Schema({
  category: {
        type: String,
        enum: ['תכשיטים_ושעונים', 'תיקים_ומזוודות', 'ארנקים_וכספים','טלפונים_ואלקטרוניקה','יהדות','ביגוד','בעלי_חיים','ציוד_רפואי','אחר'], 
        default: 'אחר' 
      },
    name: String,
    city: String,
    street: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    },
    date: Date,
    
})
module.exports=mongoose.model('Lost',LostDetails)
