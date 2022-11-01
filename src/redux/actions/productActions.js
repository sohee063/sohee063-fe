import { customAxios } from '../axiosAPI';

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const PRODUCT_LOADING = 'PRODUCT_LOADING';

export const getAllWantedList = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCT_LOADING',
        payload: {
          loading: true,
        },
      });
      const get_AllWantedList = await customAxios
        .get(`/products?page=${page}&size=10`)
        .then((res) => {
          return res;
        });
      dispatch({
        type: 'GET_PRODUCTS_SUCCESS',
        payload: {
          allProductList: get_AllWantedList.data,
        },
      });
      dispatch({
        type: 'PRODUCT_LOADING',
        payload: {
          loading: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
