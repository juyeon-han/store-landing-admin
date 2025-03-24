import axios from 'axios';

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const endPoints = {
  test: `${baseUrl}/posts`,
};

export const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const customRequest = (token?: string) => {
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
