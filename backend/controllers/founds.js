const Found = require('../models/Found')
const mongoose = require('mongoose');
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
    console.log("in addFound");

    const found = await Found.create(req.body)
    res.json(found)
}

exports.deleteFound = async (req, res) => {
    const { id } = req.params
    try {
        const idFound = await Found.findOneAndDelete({ id: id })
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
    const { categiry, name, city, street, owner, date, identifying } = req.body
    try {
        const updateFound = await Found.findOneAndUpdate(
            { id: id },
            { categiry, name, city, street, owner, date, identifying },
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
    const { id } = req.params
    try {
        console.log('GET /founds/:id hit', req.params.id);
        const found = await Found.findById(id);
        if (!found) {
            return res.status(404).json({ message: 'found not found' })
        }
        res.json(found)
    }
    catch (error) {
        console.error('Failed to get found:', error);
        res.status(500).json({ message: 'Failed to get found' });
    }
}


exports.getFoundsByIdOwner = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("ID לא תקני:", id);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const founds = await Found.find({ owner: new mongoose.Types.ObjectId(id) });
    console.log("תוצאות שנמצאו:", founds);
    res.json(founds);
  } catch (error) {
    console.error("שגיאת שרת:", error);
    res.status(500).json({ message: 'Failed to get founds filtered' });
  }
};





//add
//delete
//update
//getbyId
//getAll