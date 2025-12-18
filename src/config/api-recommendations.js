import axios from 'axios';

const recommendationApi = axios.create({
	baseURL: import.meta.env.VITE_API_RECOMMENDATIONS_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

export default recommendationApi;