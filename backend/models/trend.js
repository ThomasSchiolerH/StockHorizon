const mongoose = require('mongoose');

const TrendSchema = new mongoose.Schema({
  stockSymbol: { type: String, required: true, ref: 'Stock' },
  keyword: { type: String, required: true },
  trendValues: [{
    date: { type: String, required: true },
    value: { type: String, required: true },
  }],
  fetchedAt: { type: Date, default: Date.now },
}, { collection: 'Trends' });

module.exports = mongoose.model('Trend', TrendSchema);
