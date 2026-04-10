import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this to your backend IP when running
export const API_BASE_URL = 'http://192.168.1.100:3000/api';

const request = async (method, endpoint, body = null, requiresAuth = true) => {
  const headers = { 'Content-Type': 'application/json' };

  if (requiresAuth) {
    const token = await AsyncStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const api = {
  get: (endpoint) => request('GET', endpoint),
  post: (endpoint, body, requiresAuth = true) => request('POST', endpoint, body, requiresAuth),
  put: (endpoint, body) => request('PUT', endpoint, body),
  patch: (endpoint, body) => request('PATCH', endpoint, body),
  delete: (endpoint) => request('DELETE', endpoint),
};
