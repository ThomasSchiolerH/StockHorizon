const schedule = require('node-schedule');
const { getTrendingOverview } = require('../controllers/trendsController');

const updateTrendingStocks = async () => {
  try {
    await getTrendingOverview();
    console.log('Updated trending stocks.');
  } catch (error) {
    console.error('Error updating trending stocks:', error.message);
  }
};

// Schedule the job to run every hour
//schedule.scheduleJob('0 * * * *', updateTrendingStocks);
