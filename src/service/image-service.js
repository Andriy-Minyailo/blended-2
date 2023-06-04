import axios from 'axios';

const API_KEY = 'aweC2jw40Irs5WkTh7dvq6o3WZvCC4c9jUQqMETzV0f5sBbmONkLrp84';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};
// 'search?query=nature&page=1';
export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
