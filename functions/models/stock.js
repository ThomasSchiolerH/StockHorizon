const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
}, { collection: 'Stocks' });

module.exports = mongoose.model('Stock', StockSchema);
