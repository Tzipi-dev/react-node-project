const express=require("express")
const router=express.Router()
const verifyJWT =require('../middlewares/verifyJWT')
const { getFoundsByIdOwner}=require("../controllers/founds")

router.get('/:id',getFoundsByIdOwner)


module.exports=router