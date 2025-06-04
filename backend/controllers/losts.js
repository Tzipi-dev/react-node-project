const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Lost=require('../models/Lost')
const Found=require('../models/Found')

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
   try{
    const lost=await Lost.create(req.body)
    res.json(lost)
    match(lost)
   } catch (error) {
    console.error('Failed to add lost:', error);
    res.status(500).json({ message: 'Failed to add lost' });
  }
}

exports.deleteLost=async(req,res)=>{
    const {id}=req.params
    try{
        const idLost=await Lost.findOneAndDelete({_id: id})
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



exports.updateLost = async (req, res) => {
  const { id } = req.params;
  const { category, name, city, street, owner, date } = req.body;

  try {
    const updated = await Lost.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },   
      { category, name, city, street, owner, date },
      { new: true, runValidators: true }          
    );

    if (!updated) return res.status(404).json({ message: 'found not found' });

    res.json(updated);
  } catch (err) {
    console.error('Failed to update lost:', err);
    res.status(500).json({ message: 'Failed to update lost' });
  }
};

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

const match = async (lost) => {
  const matches = await Found.find({
    category: lost.category,
    city: lost.city,
    name: { $regex: `.*${lost.name}.*`, $options: 'i' }
  }).populate('owner');

  if (matches.length === 0) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const populatedLost = await Lost.findById(lost._id).populate('owner');
  for (const foundMatch of matches) {

    const emailToSend = populatedLost.owner?.email;
    const foundItemLink = `${process.env.CLIENT_URL}/Founds/${foundMatch._id}`;

    const mailOptions = {
      from: `"Lost & Found Team" <${process.env.EMAIL_FROM}>`,
      to: emailToSend,
      subject: 'נמצאה מציאה שיכולה להתאים למה שאיבדת',
      html: `
        <div style="direction: rtl; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">שלום ${populatedLost.owner.name},</h2>
          <p>נמצאה מציאה שעשויה להתאים לפריט שאיבדת:</p>
          <ul>
            <li><strong>שם הפריט:</strong> ${foundMatch.name}</li>
            <li><strong>קטגוריה:</strong> ${foundMatch.category}</li>
            <li><strong>מיקום:</strong> ${foundMatch.city}, ${foundMatch.street}</li>
            <li><strong>תאריך:</strong> ${foundMatch.date ? new Date(foundMatch.date).toLocaleDateString() : ''}</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${foundItemLink}" style="background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;" target="_blank">
              צפה בפריט שנמצא
            </a>
          </div>
          <p style="font-size: 14px; color: #999;">בהצלחה!<br>צוות ממצאי האובדן</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
     
    } catch (error) {
      console.error(`Failed to send email to ${emailToSend}:`, error);
    }
  }
};


