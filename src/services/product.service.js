import api from '../config/api';

const ProductService = {

    // LECTURAS

    /**
     * Obtiene la lista de cafes.
     * @param {string|null} type - Filtro opcional por subcategoria (ej: "packs", "origen_unico")
     * @returns {Promise<Array>} Lista de cafes
     */
    getAllCoffees: async (type = null) => {
        const response = await api.get('/coffees', {
            params: { type }
        });
        return response.data;
    },

    /**
     * Obtiene la lista de accesorios.
     * @param {string|null} type Filtro opcional por subcategoría (ej: "molinos")
     * @returns {Promise<Array>} Lista de accesorios
     */
    getAllAccessories: async (type = null) => {
        const response = await api.get('/accessories', {
            params: { type }
        });
        return response.data;
    },

    /**
     * Obtiene la lista de packs.
     * @returns {Promise<Array>} Lista de packs
     */
    getAllPacks: async () => {
        const response = await api.get('/packs');
        return response.data;
    },


    




};

export default ProductService;