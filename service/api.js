import axios from 'axios';

const api = axios.create({
    baseURL: 'https://nerdstore-api.onrender.com'
})

export default api;


