const Found=require('../models/Found')

exports.getAllFounds=async(req,res)=>{
    try{
        const founds=await Found.find()
        res.json(founds)
    }
    catch(error){
        console.error('Fail to get founds:',error)
        res.status(500).json({message: 'Fail to get founds'})
    }
}

exports.addFound=async(req,res)=>{
    const found=await Found.create(req.body)
    res.json(found)
}

exports.deleteFound=async(req,res)=>{
    const {id}=req.params
    try{
        const idFound=await Found.findOneAndDelete({id:id})
        if (!idFound){
           return  res.status(404).json({message: 'found not find'})
        }
        res.json({message: 'found delete successfully'})
    }
    catch(error){
        console.error('Fail to delete found:',error)
        res.status(500).json({message: 'Fail to delete found'})
    }
}

exports.updateFound=async(req,res)=>{
    const {id}=req.params
    const {categiry,name,city,street,owner,date,identifying}=req.body
    try{
        const updateFound=await Found.findOneAndUpdate(
            {id: id},
            {categiry,name,city,street,owner,date,identifying},
            {new: true}
        )
        if (!updateFound){
           return  res.status(404).json({message: 'found not found'})
        }
        res.json(updateFound)
    }
    catch(error){
        console.error('Failed to update found:', error);
        res.status(500).json({ message: 'Failed to update found' });
    }
}





exports.getFoundById=async(req,res)=>{
    const {id}=req.params
    try{
        const found=await Found.findOne({id})
        if (!found){
            return res.status(404).json({message: 'found not found'})
        }
        res.json(found)
    }
    catch(error){
        console.error('Failed to get found:', error);
        res.status(500).json({ message: 'Failed to get found' });
    }
}








//add
//delete
//update
//getbyId
//getAll