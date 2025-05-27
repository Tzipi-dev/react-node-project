const express=require("express")
const router=express.Router()
const verifyJWT =require('../middlewares/verifyJWT')
const loginFunction =require('../controllers/authController')
const { deleteUser, updateUser, getUserById } = require("../controllers/user")



router.post('/',loginFunction.login)
router.delete('/:id',verifyJWT,deleteUser)
router.put('/:id',verifyJWT,updateUser)
router.get('/:id',verifyJWT,getUserById)


module.exports=router