import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ucsazjrbe0.execute-api.us-east-1.amazonaws.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
