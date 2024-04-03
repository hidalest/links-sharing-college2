import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../config/apiConfig';

export const handleRequest = async (
  data: any,
  successMessage: string,
  errorMessage: string
) => {
  try {
    const response = await axios.post(SERVER_URL, data, {
      timeout: 5000, // Timeout in milliseconds (adjust as needed)
    });
    console.log(response);
    alert(successMessage);
  } catch (error: AxiosError | any) {
    console.error('Error:', error);
    if (error.code === 'ECONNABORTED') {
      console.log('Request timed out');
      alert('Request timed out. Please try again later.');
    } else {
      console.log('Something went wrong:', error.message);
      alert(errorMessage);
    }
  }
};
