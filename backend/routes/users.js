const express=require("express")
const router=express.Router()
const {getAllUsers,addUser,deleteUser,updateUser,getUserById}=require("../controllers/user")


router.get('/',getAllUsers)
router.post('/',addUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
router.get('/:id',getUserById)


module.exports=router