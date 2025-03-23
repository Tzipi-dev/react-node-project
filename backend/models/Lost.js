const mongoose=require('mongoose')
const User = require('./User')
const LostDetails=new mongoose.Schema({
  category: {
        type: String,
        enum: ['תכשיטים ושעונים', 'תיקים ומזוודות', 'ארנקים וכספים','טלפונים ואלקטרוניקה','יהדות','ביגוד','בעלי חיים','ציוד רפואי','אחר'], 
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
