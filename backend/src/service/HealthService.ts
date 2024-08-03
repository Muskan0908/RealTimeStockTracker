import axios from 'axios';
import { API_URL } from '../constant/Constant';

/**
 * Function to check if api is working fine
 * @returns status 
 */
export const healthCheck = async () => {
    try {
      const response = await axios.post(API_URL+`/status`);
      return { responseCode: response.status, status: response.statusText};
    } catch (error) {
      console.error('Error connecting to API:', error);
    }
  };