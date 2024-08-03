import axios from 'axios';
import { API_URL, API_KEY, symbols } from '../constant/Constant';
import Price from '../model/price';
import { io } from '..';

/**
 * Call API to update price of each of our symbol
 */
export const fetchCryptoData = async () => {
    console.log('In fetchCryptoData')
   
  symbols.forEach(async (symbol) => {
    const response = await axios.post(API_URL+`/coins/single`, {
      currency: "USD",
      code: symbol,
      meta: true
  }, {
      headers: {
          'x-api-key': API_KEY
      }
  })
  const cryptoData = response.data;
  console.log(cryptoData);

  let newData = await Price.insertMany(
    {
      symbol: symbol,
      name: cryptoData.name.toLowerCase(),
      price: cryptoData.rate,
      allTimeHighUSD: cryptoData.allTimeHighUSD,
    }
  )
  if (Array.isArray(newData)) {
    console.log('newData is Array')
  } 
  console.log(newData);
  /**
   * Emit whenever there is a update in price so client can listen to it and update frontend in realtime
   */
  io.emit('UPDATE_DATA', newData);
  console.log('Data Updated!')
  });
};