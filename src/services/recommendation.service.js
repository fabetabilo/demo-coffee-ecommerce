import apiRecommendations from '../config/api-recommendations'

const RecommendationService = {
	/**
	 * Envía las respuestas del quiz y obtiene la lista de cafés recomendados.
	 * @param {Record<string, string>} quizPayload
	 * @returns {Promise<Array>} Lista de CoffeeDto
	 */
	getRecommendations: async (quizPayload) => {
		const response = await apiRecommendations.post('/match', quizPayload)
		return response.data
	}
}

export default RecommendationService;
