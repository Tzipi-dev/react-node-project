const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Lost = require('../models/Lost');
const Found = require('../models/Found')
exports.getAllFounds = async (req, res) => {
    try {
        const founds = await Found.find()
        res.json(founds)
    }
    catch (error) {
        console.error('Fail to get founds:', error)
        res.status(500).json({ message: 'Fail to get founds' })
    }
}

exports.addFound = async (req, res) => {
    try{
    const found = await Found.create(req.body)
    res.json(found)
    match(found)
    } catch (error) {
    console.error('Failed to add found:', error);
    res.status(500).json({ message: 'Failed to add found' });
  }

}

exports.deleteFound = async (req, res) => {
    const { id } = req.params
   
    try {
        const idFound = await Found.findOneAndDelete({ _id: id })
        if (!idFound) {
            return res.status(404).json({ message: 'found not find' })
        }
        res.json({ message: 'found delete successfully' })
    }
    catch (error) {
        console.error('Fail to delete found:', error)
        res.status(500).json({ message: 'Fail to delete found' })
    }
}

exports.updateFound = async (req, res) => {
    const { id } = req.params
    const { category, name, city, street, owner, date } = req.body
   
    try {
        const updateFound = await Found.findOneAndUpdate(
            { _id: id },
            { category, name, city, street, owner, date },
            { new: true }
        )
        if (!updateFound) {
            return res.status(404).json({ message: 'found not found' })
        }
        res.json(updateFound)
    }
    catch (error) {
        console.error('Failed to update found:', error);
        res.status(500).json({ message: 'Failed to update found' });
    }
}





exports.getFoundById = async (req, res) => {
    const { id } = req.params;

    // בדיקה מוקדמת שה-id קיים ובפורמט תקין (ObjectId)
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid or missing ID' });
    }

    try {
        const found = await Found.findById(id);
        if (!found) {
            return res.status(404).json({ message: 'Found not found' });
        }
        res.json(found);
    } catch (error) {
        console.error('Failed to get found:', error);
        res.status(500).json({ message: 'Failed to get found' });
    }
};

exports.getFoundsByIdOwner = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("ID לא תקני:", id);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const founds = await Found.find({ owner: new mongoose.Types.ObjectId(id) });
    
    res.json(founds);
  } catch (error) {
    console.error("שגיאת שרת:", error);
    res.status(500).json({ message: 'Failed to get founds filtered' });
  }
};

const match = async (found) => {
  const matches = await Lost.find({
    category: found.category,
    city: found.city,
    name: { $regex: `.*${found.name}.*`, $options: 'i' }
  }).populate('owner');

  if (matches.length === 0) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const lostMatch of matches) {
    const emailToSend = lostMatch.owner.email;
    const foundItemLink = `${process.env.CLIENT_URL}/Founds/${found._id}`; 

    const mailOptions = {
      from: `"Lost & Found Team" <${process.env.EMAIL_FROM}>`,
      to: emailToSend,
      subject: 'נמצאה מציאה שיכולה להתאים למה שאיבדת',
      html: `
        <div style="direction: rtl; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">שלום ${lostMatch.owner.name},</h2>
          <p>נמצאה מציאה שעשויה להתאים לפריט שאיבדת:</p>
          <ul>
            <li><strong>שם הפריט:</strong> ${found.name}</li>
            <li><strong>קטגוריה:</strong> ${found.category}</li>
            <li><strong>מיקום:</strong> ${found.city}, ${found.street}</li>
            <li><strong>תאריך:</strong> ${found.date ? new Date(found.date).toLocaleDateString() : ''}</li>
          </ul>
          <p>לפרטים נוספים ולקישור למציאה לחץ על הכפתור הבא:</p>
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


//add
//delete
//update
//getbyId
//getAll