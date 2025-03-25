const express=require("express")
const router=express.Router()
const verifyJWT =require('../middlewares/verifyJWT')
const {getAllFounds,addFound,deleteFound,updateFound,getFoundById}=require("../controllers/founds")

router.get('/',getAllFounds)
router.post('/',addFound)
router.delete('/:id',verifyJWT,deleteFound)
router.put('/:id',verifyJWT,updateFound)
router.get('/:id',verifyJWT,getFoundById)


module.exports=router