
const axios = require('axios');

const api = axios.create({
  baseURL: URL_WEB_SERVICE,
  timeout: 10000,
});

export default api;