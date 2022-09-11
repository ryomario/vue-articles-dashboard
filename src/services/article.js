import { baseApi } from '@/services';

// Article API endpoint
const api_ep = '/api';

// List Articles API endpoint
const articles_ep = '/articles';

const articles = () => baseApi.get(`${api_ep + articles_ep}`);

export { articles };
