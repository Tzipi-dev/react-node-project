const express=require("express")
const router=express.Router()
const {getAllUsers,addUser,deleteUser,updateUser,getUserById}=require("../controllers/user")
const verifyJWT = require("../middlewares/verifyJWT")


router.get('/',getAllUsers)
router.post('/',addUser)
router.delete('/:id',verifyJWT,deleteUser)
router.put('/:id',verifyJWT,updateUser)
router.get('/:id',verifyJWT,getUserById)


module.exports=router