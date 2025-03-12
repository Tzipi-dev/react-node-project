const express=require("express")
const router=express.Router()
const {getAllLosts,addLost,deleteLost,updateLost,getLostById}=require("../controllers/losts")

router.get('/',getAllLosts)
router.post('/',addLost)
router.delete('/:id',deleteLost)
router.put('/:id',updateLost)
router.get('/:id',getLostById)


module.exports=router