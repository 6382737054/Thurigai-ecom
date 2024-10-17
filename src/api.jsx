import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Make sure this matches your backend URL

export const fetchUserColumns = async () => {
  try {
    console.log('Making API request to:', `${API_BASE_URL}/`);
    const response = await axios.get(`${API_BASE_URL}/`);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};