import axios from 'axios';
import { baseApiUrl as baseURL } from '@/utils/constant';
import { g$certCookies, d$certCookies } from '@/utils/cookies';

axios.defaults.headers['Content-Type'] = 'application/json';

const baseApi = axios.create({
  baseURL,
});

baseApi.interceptors.request.use(
  (config) => {
    const token = g$certCookies();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    else {
      d$certCookies();
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    throw error?.message ?? error;
  },
);

baseApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    switch (error.response.status) {
      case 401:
        d$certCookies();
        break;
      case 500:
        throw Error('Internal Server Error')
      default:
        break;
    }
    throw error?.response?.data ?? error;
  },
);

export { baseApi };
