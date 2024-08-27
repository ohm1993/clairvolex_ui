import apiService from '../utils/apiService';

const authService = {
  register: (userData) => {
    return apiService.post('/auth/register', userData);
  },
  login: (credentials) => {
    return apiService.post('/auth/login', credentials);
  }
};

export default authService;
