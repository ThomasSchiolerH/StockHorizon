const express = require('express');
const router = express.Router();
const trendsController = require('../controllers/trendsController');

router.get('/trending', trendsController.getTrendingStocks);
router.get('/trending-overview', trendsController.getTrendingOverview);

module.exports = router;
