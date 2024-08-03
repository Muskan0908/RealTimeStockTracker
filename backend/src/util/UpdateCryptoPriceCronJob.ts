import cron from 'node-cron';
import { fetchCryptoData } from '../service/CryptoPriceService';
import Price from '../model/price';

// Update Price every 5 seconds
cron.schedule('*/5 * * * * *', async () => {
  try {
    console.log('Updating Data from API')
    await fetchCryptoData();
    console.log('Crypto data fetched successfully');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
});

// Delete 10 minutes previous data every 10 seconds
cron.schedule('*/10 * * * * *', async () => {
  try {
    console.log('Starting to delete old data');
    const oneDayAgo = new Date(Date.now() -  10 * 60 * 1000);
    await Price.deleteMany({ timestamp: { $lt: oneDayAgo } });
    console.log('Old prices deleted successfully');
  } catch (error) {
    console.error('Error deleting old prices:', error);
  }
});

