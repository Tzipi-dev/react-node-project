const express = require('express');
const router = express.Router();
const citiesController = require('../controllers/cities');

router.get('/', citiesController.getAllCitiesInIsrael);

module.exports = router;
