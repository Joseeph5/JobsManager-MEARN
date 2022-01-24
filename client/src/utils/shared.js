import axios from 'axios';
import { useSelector } from 'react-redux';

function useShared() {
  const { token } = useSelector((state) => state);

  const test = () => {
    console.log('it works');
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', JSON.stringify(user.location));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('location');
  };

  const authService = axios.create({
    baseURL: '/api/v1',
  });

  // response interceptor
  authService.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  authService.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
      }
      return Promise.reject(error);
    }
  );

  return { test, addUserToLocalStorage, removeUserFromLocalStorage, authService };
}

export default useShared;
