import { baseApi } from '@/services';

// Auth API endpoint
const api_ep = import.meta.env.VITE_API_AUTH_ENDPOINT;

// Login API endpoint
const login_ep = import.meta.env.VITE_API_AUTH_LOGIN_ENDPOINT;

const login = (body) => baseApi.post(`${api_ep + login_ep}`, body);

export { login };
