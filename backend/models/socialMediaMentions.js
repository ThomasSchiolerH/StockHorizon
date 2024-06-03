const mongoose = require('mongoose');

const SocialMediaMentionSchema = new mongoose.Schema({
  stockSymbol: { type: String, required: true, ref: 'Stock' },
  platform: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, required: true },
  engagement: { type: Object }, // e.g., { likes: Number, retweets: Number }
});

module.exports = mongoose.model('SocialMediaMention', SocialMediaMentionSchema);
