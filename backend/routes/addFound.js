const express=require("express")
const router=express.Router()

const {getAllCitiesInIsrael}= require('../controllers/city')

router.get('/',getAllCitiesInIsrael)



module.exports=router