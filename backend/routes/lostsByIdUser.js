const express=require("express")
const router=express.Router()

const { getLostsByIdOwner } = require("../controllers/losts")


router.get('/:id',getLostsByIdOwner)


module.exports=router