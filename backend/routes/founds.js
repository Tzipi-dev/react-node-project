const express=require("express")
const router=express.Router()

const {getAllFounds,addFound,deleteFound,updateFound,getFoundById}=require("../controllers/founds")
router.get('/',getAllFounds)
router.post('/',addFound)
router.delete('/:id',deleteFound)
router.put('/:id',updateFound)
router.get('/:id',getFoundById)

module.exports=router