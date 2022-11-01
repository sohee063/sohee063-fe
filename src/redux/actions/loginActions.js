import Cookies from 'js-cookie';
import { customAxios } from '../axiosAPI';

export const loginActions = (id, password) => {
  return async (dispatch) => {
    try {
      return await customAxios
        .post(`/login`, {
          id: id,
          password: password,
        })
        .then((res) => {
          Cookies.set('access', res.data.data.accessToken, {
            expires: 7,
          });
          localStorage.setItem('userName', res.data.data.user.NAME);
          return res;
        })
        .then((res) => window.location.replace('/'));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutActions = () => {
  return async () => {
    try {
      Cookies.remove('access');
      localStorage.removeItem('userName');
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  };
};
