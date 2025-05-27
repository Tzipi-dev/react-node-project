const express=require("express")
const router=express.Router()
const {getAllLosts,addLost,deleteLost,updateLost,getLostById, getLostsByIdOwner}=require("../controllers/losts")
const verifyJWT = require("../middlewares/verifyJWT")

router.get('/',getAllLosts)
router.post('/',addLost)
router.delete('/:id',verifyJWT,deleteLost)
router.put('/:id',verifyJWT,updateLost)
router.get('/:id',verifyJWT,getLostById)


module.exports=router