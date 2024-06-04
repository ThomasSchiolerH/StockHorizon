const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  stockSymbol: { type: String, required: true, ref: 'Stock' },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  source: { type: String },
  content: { type: String },
}, { collection: 'News' });

module.exports = mongoose.model('News', NewsSchema);
