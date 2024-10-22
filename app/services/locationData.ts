import axios from 'axios';

const API_KEY = 'ac28fc7958155565e8eb25429ffcced7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchLocationCoordinates = async (location: string): Promise<any> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        appid: API_KEY,
      },
    });
    console.log('response:', response.data.message);
    if (response.data.cod !== "200") {
      throw new Error(response.data.message || 'Error fetching data');
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error fetching location coordinates:', error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error('Error fetching location coordinates:', error);
    }
    throw error;
  }
};