import axios from 'axios';

// Request interceptor
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // Handle unauthorized
        break;
      case 404:
        console.error('Endpoint not found:', error.config.url);
        break;
      case 500:
        console.error('Server error:', error.response.data);
        break;
      default:
        console.error('Request failed:', error.message);
    }
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Request setup error:', error.message);
  }
  return Promise.reject(error);
});