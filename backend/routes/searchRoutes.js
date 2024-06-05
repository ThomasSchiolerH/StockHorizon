const express = require('express');
const router = express.Router();
const { searchStocks } = require('../controllers/searchController');

router.get('/search', searchStocks);

module.exports = router;
