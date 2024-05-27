import axios from 'axios';
import { getToken } from './common';

function getAxios(baseURL: string) {
  const ins = axios.create({
    baseURL,
  });
  ins.interceptors.request.use(function (config) {
    if (!config.headers) {
      config.headers = {};
    }
    const accessToken = getToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    config.headers['Content-Type'] = 'application/json';
    // Do something before request is sent
    return config;
  });

  return ins;
}

// Ensure VITE_API_URL is defined
if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL environment variable is not defined');
}

// Create an axios instance with the base URL
export const API = getAxios(`${import.meta.env.VITE_API_URL}/api`);
