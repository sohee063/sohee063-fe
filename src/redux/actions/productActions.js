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
      const get_AllWantedList = await customAxios.get(`/pagination?page=${page}&size=10`);

      dispatch({
        type: 'GET_PRODUCTS_SUCCESS',
        payload: {
          allWantedList: get_AllWantedList.data.items,
          totalPage: get_AllWantedList.data.page.totalElements,
          scrollAllWantedList: get_AllWantedList.data.items,
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
