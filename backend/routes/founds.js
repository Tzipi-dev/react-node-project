const express=require("express")
const router=express.Router()

const {getAllFounds,addFound,deleteFound,updateFound,getFoundById}=require("../controllers/founds")
const verifyJWT = require("../middlewares/verifyJWT")
router.get('/',getAllFounds)
router.post('/',addFound)
router.delete('/:id',verifyJWT,deleteFound)
router.put('/:id',verifyJWT,updateFound)
router.get('/:id',verifyJWT,getFoundById)

module.exports=router