import api from '../lib/api';

export const fetchProfile = () => api.get('/api/user/profile');

export const updateProfileRequest = (payload) => api.put('/api/user/update', payload);

