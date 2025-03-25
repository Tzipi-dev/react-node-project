const express=require("express")
const router=express.Router()
const verifyJWT =require('../middlewares/verifyJWT')
const login =require('../controllers/authController')


router.post('/',login)
// router.delete('/:id',verifyJWT,deleteFound)
// router.put('/:id',verifyJWT,updateFound)
// router.get('/:id',verifyJWT,getFoundById)


module.exports=router