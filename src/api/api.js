import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

API.interceptors.request.use(config => {
  config.headers['x-agent-id'] = 'demo-agent-id';
  return config;
});

export default API;