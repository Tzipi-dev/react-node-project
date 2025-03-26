const express = require('express');
const router = express.Router();
const  registerFunction  = require('../controllers/authController')
const User=require('../models/User');
const { getAllUsers, deleteUser, updateUser, getUserById } = require('../controllers/user');
router.post('/', registerFunction.register, async (req, res, next) => {
    try {
        await User.create(req.body);
        res.status(201).json({ message: 'משתמש נוצר בהצלחה' });
        const token = result.email.toString() + ' ' + result.password.toString();
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'development',
          sameSite: 'strict',
          maxAge: 3600000, 
        });
    
        res.send(result); 
        next();
    } catch (error) {
        console.error('שגיאה בהוספת משתמש:', error);
        res.status(500).json({ message: 'שגיאה פנימית בשרת' });
        next(error);
    }
});
router.get('/',getAllUsers)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
router.get('/:id',getUserById)
module.exports = router;