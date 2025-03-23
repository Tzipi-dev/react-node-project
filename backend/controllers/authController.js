const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const login=async(req,res)=>{
    const {email, passward}=req.body
    if (!email||!passward)
        return res.status(400).json({message: "please fill all the required parameters"})
    const foundUser=await User.findOne({email}).lean()
    if (!foundUser)
        return res.status(401).json({message: "UnauthOrilized"})
    const match=await bcrypt.compare(passward, foundUser.passward)
    if (!match)
        return res.status(401).json({message: "UnauthOrilized"})
    const userInfo={_id: foundUser._id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone,passward: foundUser.passward}
    const accessToken=jwt.sign(userInfo,process.env.accessToken)
    res.json({accessToken:accessToken, user:userInfo})
}


const register=async(req,res)=>{
    const {name,email,phone,_id, passward}=req.body
    if (!name||!passward)
         return res.status(400).json({message: "please fill all the required parameters"})  
    const duplicate=await User.findOne({name}).lean()
    if (duplicate)
        return res.status(409).json({message: "duplicated user name"})
    const hashpwd=await bcrypt.hash(passward,10)
    const userObject={name,email,phone,_id,passward: hashpwd}
    const user=await User.create(userObject)
    if (user)
        return res.status(201).json({message: `${user.name} created`})
    return res.status(400).json({message: "invalid user received"})
}

module.exports ={login, register}