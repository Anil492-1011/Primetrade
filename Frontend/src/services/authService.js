import api from '../lib/api';

export const signupRequest = (payload) => api.post('/api/auth/signup', payload);

export const loginRequest = (payload) => api.post('/api/auth/login', payload);

