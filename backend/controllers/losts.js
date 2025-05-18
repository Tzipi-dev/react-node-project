const Lost=require('../models/Lost')
const mongoose = require('mongoose');
exports.getAllLosts=async(req,res)=>{
    try{
       
        const losts=await Lost.find()
        res.json(losts)
    }
    catch(error){
        console.error('Fail to get losts:',error)
        res.status(500).json({message: 'Fail to get losts'})
    }
}

exports.addLost=async(req,res)=>{
    const lost=await Lost.create(req.body)
    res.json(lost)
}

exports.deleteLost=async(req,res)=>{
    const {id}=req.params
    try{
        const idLost=await Lost.findOneAndDelete({id:id})
        if (!idLost){
           return  res.status(404).json({message: 'lost not find'})
        }
        res.json({message: 'lost delete successfully'})
    }
    catch(error){
        console.error('Fail to delete losts:',error)
        res.status(500).json({message: 'Fail to delete losts'})
    }
}

exports.updateLost=async(req,res)=>{
    const {id}=req.params
    const {categiry,name,city,street,owner,date}=req.body
    try{
        const updateLost=await Lost.findOneAndUpdate(
            {id: id},
            {categiry,name,city,street,owner,date},
            {new: true}
        )
        if (!updateLost){
           return  res.status(404).json({message: 'lost not found'})
        }
        res.json(updateLost)
    }
    catch(error){
        console.error('Failed to update lost:', error);
        res.status(500).json({ message: 'Failed to update lost' });
    }
}

exports.getLostById=async(req,res)=>{
    const {id}=req.params
    try{
        
        const lost=await Lost.findById(id);
        if (!lost){
            return res.status(404).json({message: 'lost not found'})
        }
        res.json(lost)
    }
    catch(error){
        console.error('Failed to get lost:', error);
        res.status(500).json({ message: 'Failed to get lost' });
    }
}

exports.getLostsByIdOwner = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("ID לא תקני:", id);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const losts = await Lost.find({ owner: new mongoose.Types.ObjectId(id) });
   
    res.json(losts);
  } catch (error) {
    console.error("שגיאת שרת:", error);
    res.status(500).json({ message: 'Failed to get losts filtered' });
  }
}


