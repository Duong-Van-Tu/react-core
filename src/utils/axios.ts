import axios from 'axios';
import { getToken } from './common';

function getAxios(baseURL: string) {
  const ins = axios.create({
    baseURL,
  });

  ins.interceptors.request.use(function (config: any) {
    if (!config.headers) {
      config.headers = {};
    }
    const accessToken = getToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // Do something before request is sent
    return config;
  });
  return ins;
}

export const API = getAxios(`${process.env.REACT_APP_API_URL}/api`);
