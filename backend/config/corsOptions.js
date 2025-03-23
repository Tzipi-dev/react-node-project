const whitelist = [
  'http://localhost:5173',
  'http://localhost:8000',
  'http://localhost:7000',
  'http://localhost:5000',
];

const corsOptions = {
  origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) { 
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
 