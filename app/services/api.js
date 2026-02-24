


import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://k4media-image-gallery.onrender.com' || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    console.log('🟢 [Frontend] Request:', config.method.toUpperCase(), config.url);
    console.log('🟢 [Frontend] Token:', token ? '✅ Found' : '❌ Not found');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('🟢 [Frontend] Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('🔴 [Frontend] Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const authService = {
  googleLogin: (firebaseToken) =>
    api.post('/user/google-login', { firebaseToken }),
};

export const imageService = {
  getImages: (sort = 'newest') =>
    api.get('/images', { params: { sort } }),
  likeImage: (imageId) =>
    api.post(`/images/${imageId}/like`),
  unlikeImage: (imageId) =>
    api.post(`/images/${imageId}/unlike`),
  getLikedImages: () =>
    api.get('/images/user/liked-images'),
};

export default api;


