const jwt=require('jsonwebtoken')


const verifyJWT=(req,res,next)=>{
  const authHeader=req.headers.authorization||req.headers.Authorization
  if (!authHeader?.startWith('Bearer '))
      return res.status(401).json({message: "unauthorization"})
  const token=authHeader.split(' ')[1]
  console.log('Generated Token:', token);
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
   if (err)
      return res.status(403).json({message: `Forbidden ${err}`})
   req.user=decode
   next()
  })
}
module.exports = verifyJWT


