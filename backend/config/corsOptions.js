 const allowedOrigins=[
    'http://localhose:5173',
    'http://localhose:8000',
    'http://localhose:7000',

 ]
var whitelist = ['http://localhost:3000/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credential: true,
  optionsSuccessStatus: 200
}
module.exports=corsOptions
 