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

    return response.data;
  } catch (error) {
    console.error('Error fetching location coordinates:', error);
    throw error;
  }
};