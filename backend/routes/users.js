const express=require("express")
const router=express.Router()
const {getAllUsers,addUser,deleteUser,updateUser,getUserById}=require("../controllers/user")
const verifyJWT = require("../middlewares/verifyJWT")
const authController=require("../controllers/authController")


// router.get('/',getAllUsers)
// router.post('/',authController.register,addUser)
// router.delete('/:id',verifyJWT,deleteUser)
// router.put('/:id',verifyJWT,updateUser)
// router.get('/:id',verifyJWT,authController.login,getUserById)
router.get('/',getAllUsers)
router.post('/',addUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
router.get('/:id',getUserById)

module.exports=router