const express = require("express")
const app = express()
require('dotenv').config();
const cors=require("cors")
const userRouter = require('./routes/users')
const cookieParser = require('cookie-parser');
const lostRouter = require('./routes/losts')
const foundRouter = require('./routes/founds')
const loginRouter=require('./routes/login')
const addFoundRouter=require('./routes/addFound')
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const PORT = process.env.PORT || 5000
connectDB()
const  mongoose = require("mongoose");
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use('/users', userRouter)
app.use('/losts', lostRouter)
app.use('/founds', foundRouter)
app.use('/addFound',addFoundRouter)
app.use('/login', loginRouter)
mongoose.connect(process.env.CONECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => app.listen(PORT, () => {
        console.log(`server is runing on port ${PORT}`);
    })
).catch((error) => { console.log(error) })