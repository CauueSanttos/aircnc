import axios from 'axios';

import { hostUrl } from '../configs/host';

const api = axios.create({
  baseURL: hostUrl,
});

export default api;