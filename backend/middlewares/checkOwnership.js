const Lost=require('../models/Lost')
const checkOwnership = async (req, res, next) => {
    try {
        const lostItem = await Lost.findById(req.params.id);

        if (!lostItem) {
            return res.status(404).json({ message: 'Lost item not found' });
        }

        if (lostItem.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
module.exports=checkOwnership