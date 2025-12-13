import axios from 'axios';

// Configuracion de API productos
const api = axios.create({
    baseURL: import.meta.env.VITE_API_PRODUCTS_URL, 
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;