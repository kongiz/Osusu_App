import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  register: async ({ name, phone, password }) => {
    const data = await api.post('/auth/register', { name, phone, password }, false);
    if (data.token) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  login: async ({ phone, password }) => {
    const data = await api.post('/auth/login', { phone, password }, false);
    if (data.token) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },

  getStoredUser: async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: async () => {
    return await AsyncStorage.getItem('token');
  },
};
