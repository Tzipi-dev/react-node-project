const User=require('../models/User')

exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }
    catch(error){
        console.error('Fail to get users:',error)
        res.status(500).json({message: 'Fail to get users'})
    }
}

exports.addUser=async(req,res)=>{
    const user=await User.create(req.body)
    res.json(user)
}

exports.deleteUser=async(req,res)=>{
    const {id}=req.params
    try{
        const idUser=await User.findOneAndDelete({id:id})
        if (!idUser){
           return  res.status(404).json({message: 'user ost not find'})
        }
        res.json({message: 'user delete successfully'})
    }
    catch(error){
        console.error('Fail to delete user:',error)
        res.status(500).json({message: 'Fail to delete user'})
    }
}

exports.updateUser=async(req,res)=>{
    const {id}=req.params
    const {name,passward,phone,email}=req.body
    try{
        const updateUser=await User.findOneAndUpdate(
            {id: id},
            {name,passward,phone,email},
            {new: true}
        )
        if (!updateUser){
           return  res.status(404).json({message: 'user not found'})
        }
        res.json(updateUser)
    }
    catch(error){
        console.error('Failed to update user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
}



exports.getUserById=async(req,res)=>{
    const {id}=req.params
    try{
        const user=await User.findOne({id})
        if (!user){
            return res.status(404).json({message: 'user not found'})
        }
        res.json(user)
    }
    catch(error){
        console.error('Failed to get user:', error);
        res.status(500).json({ message: 'Failed to get user' });
    }
}



