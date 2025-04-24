const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const User = require('../models/User');
const login=async(req,res)=>{
    const {email, password}=req.body
    if (!email||!password)
        return res.status(400).json({message: "please fill all the required parameters"})
    const foundUser=await User.findOne({email}).lean()
    if (!foundUser)
        return res.status(401).json({message: "UnauthOrilized"})
    const match=await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({message: "UnauthOrilized"})
    const userInfo={_id: foundUser._id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone,password: foundUser.password}
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    // res.cookie('token', accessToken, {
    //     httpOnly: true,      
    //     secure: true,         
    //     sameSite: 'Strict',   
    //     path: '/',            
    //     maxAge: 24 * 60 * 60 * 1000, 
    //   });
    res.json({accessToken:accessToken, user:userInfo})
}
const register=async(req,res)=>{
    const {name,email,phone,_id, password}=req.body
    if (!name||!password||!email||!phone)
         return res.status(400).json({message: "please fill all the required parameters"})  
    const duplicate=await User.findOne({password}).lean()
    if (duplicate)
        return res.status(409).json({message: "duplicated user name"})
    const hashpwd=await bcrypt.hash(password,10)
    const userObject={name,email,phone,_id,password: hashpwd}
    const user=await User.create(userObject)
    if (user)
        return res.status(201).json({message: `${user.name} created`})
    return res.status(400).json({message: "invalid user received"})
}
module.exports ={login, register}
//module.exports=login