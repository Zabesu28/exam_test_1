import axios from 'axios';

// Comment gérer différentes URLs pour le développement, la pré-production et la production ?
const api = axios.create({
  baseURL: (process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'https://backend-k9wz.onrender.com') + '/api',
});

export default api;
