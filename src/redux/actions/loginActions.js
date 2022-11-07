import axios from 'axios';
import Cookies from 'js-cookie';

export const loginActions = (id, password) => {
  return async (dispatch) => {
    try {
      return await axios
        .post(`/login`, {
          id: id,
          password: password,
        })
        .then((res) => {
          Cookies.set('access', res.data.data.accessToken, {
            expires: 1,
          });
          localStorage.setItem('userName', res.data.data.user.NAME);
          localStorage.setItem('userID', res.data.data.user.ID);
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
      localStorage.removeItem('userID');
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  };
};
