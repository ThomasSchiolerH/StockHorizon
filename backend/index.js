const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const trendsRouter = require('./routes/trendsRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
    cors({
      origin: "http://localhost:3001",
    })
  );
app.use(express.json());
app.use('/api/trends', trendsRouter); //http://localhost:3000/api/trends/trending

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Basic Route
app.get('/', (req, res) => {
  res.send('Trending Stocks Backend');
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
