import api from '../lib/api';

export const fetchItemsRequest = (params) => api.get('/api/items', { params });

export const createItemRequest = (payload) => api.post('/api/items', payload);

export const updateItemRequest = (id, payload) => api.put(`/api/items/${id}`, payload);

export const deleteItemRequest = (id) => api.delete(`/api/items/${id}`);

