import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiService = {
  post: async (endpoint, data, includeAuth = false) => {
    try {
      const config = {};
      if (includeAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
      }
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network Error');
    }
  },
  
  get: async (endpoint, includeAuth = false) => {
    try {
      const config = {};
      if (includeAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
      }
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network Error');
    }
  },

  put: async (endpoint, data, includeAuth = false) => {
    try {
      const config = {};
      if (includeAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
      }
      const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network Error');
    }
  },
  
  delete: async (endpoint, includeAuth = false) => {
    try {
      const config = {};
      if (includeAuth) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
      }
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network Error');
    }
  }
  
};

export default apiService;
