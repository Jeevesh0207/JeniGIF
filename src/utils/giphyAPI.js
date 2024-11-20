import axios from 'axios';

// const API_KEY = 'uAkKNLFghWqwU5LakdCj1ohEqmKRNsii';
const API_KEY = 'L8eXbxrbPETZxlvgXN9kIEzQ55Df04v0';
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const fetchTrendingGifs = async (offset = 0, limit = 10) => {
    const response = await axios.get(`${BASE_URL}/trending`, {
        params: { api_key: API_KEY, offset, limit },
    });
    return response.data.data;
};

export const searchGifs = async (query, offset = 0, limit = 20) => {
    const response = await axios.get(`${BASE_URL}/search`, {
        params: { api_key: API_KEY, q: query, offset, limit },
    });
    return response.data.data;
};

