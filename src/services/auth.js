import { baseApi } from '@/services';

// Auth API endpoint
const api_ep = '/api';

// Login API endpoint
const login_ep = '/login';

const login = (body) => baseApi.post(`${api_ep + login_ep}`, body);

export { login };
