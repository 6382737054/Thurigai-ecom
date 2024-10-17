import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Make sure this matches your backend URL

export const fetchUserColumns = async () => {
  try {
    console.log('Making API request to:', `${API_BASE_URL}/`);
    const response = await axios.get(`${API_BASE_URL}/`);
    console.log('API response:', response.data);

    // Extract the table structure and user data
    const tableStructure = [
      { Field: 'id', Type: 'INT', Null: 'NO', Key: 'PRI', Default: null, Extra: 'auto_increment' },
      { Field: 'name', Type: 'VARCHAR(45)', Null: 'NO', Key: '', Default: null, Extra: '' },
      { Field: 'userscol', Type: 'VARCHAR(45)', Null: 'NO', Key: '', Default: null, Extra: '' },
      { Field: 'email', Type: 'VARCHAR(45)', Null: 'NO', Key: '', Default: null, Extra: '' }
    ];
    const userData = response.data;
console.log(userData)
    return { tableStructure, userData };
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};