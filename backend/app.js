const express=require('express')
const app=express()
const PORT=process.env.PORT||5000
const userRouter=require('./routes/users')
const lostRouter=require('./routes/losts')
const foundRouter=require('./routes/founds')
const mongoose  = require('mongoose')
require("dotenv").config()
app.use('/users',userRouter)
app.use('/losts',lostRouter)
app.use('/founds',foundRouter)


mongoose.connect(process.env.CONECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });



    





