import { customAxios } from '../axiosAPI';

export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
export const GET_DETAIL_PRODUCTS_SUCCESS = 'GET_DETAIL_PRODUCTS_SUCCESS';
export const GET_SCROLL_PRODUCTS_SUCCESS = 'GET_SCROLL_PRODUCTS_SUCCESS';
export const RESET_SCROLL_PRODUCTS_SUCCESS = 'RESET_SCROLL_PRODUCTS_SUCCESS';
export const PRODUCT_LOADING = 'PRODUCT_LOADING';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';

export const getAllProductList = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCT_LOADING',
        payload: {
          loading: true,
        },
      });
      const get_AllProductList = await customAxios
        .get(`/products?page=${page}&size=10`)
        .then((res) => {
          return res;
        });
      dispatch({
        type: 'GET_ALL_PRODUCTS_SUCCESS',
        payload: {
          allProductList: get_AllProductList.data,
        },
      });
      dispatch({
        type: 'PRODUCT_LOADING',
        payload: {
          loading: false,
        },
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: 'PRODUCT_ERROR',
          payload: error.response.data,
        });
      }
    }
  };
};

export const getScrollProductList = (page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCT_LOADING',
        payload: {
          loading: true,
        },
      });
      const get_ScrollProductList = await customAxios
        .get(`/products?page=${page}&size=16`)
        .then((res) => {
          return res;
        });
      dispatch({
        type: 'GET_SCROLL_PRODUCTS_SUCCESS',
        payload: {
          scrollProductList: get_ScrollProductList.data,
        },
      });
      dispatch({
        type: 'PRODUCT_LOADING',
        payload: {
          loading: false,
        },
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: 'PRODUCT_ERROR',
          payload: error.response.data,
        });
      }
    }
  };
};

export const getProductDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCT_LOADING',
        payload: {
          loading: true,
        },
      });
      const get_ProductDetail = await customAxios.get(`/products/${id}`).then((res) => {
        return res;
      });
      dispatch({
        type: 'GET_DETAIL_PRODUCTS_SUCCESS',
        payload: {
          productDetail: get_ProductDetail.data,
        },
      });
      dispatch({
        type: 'PRODUCT_LOADING',
        payload: {
          loading: false,
        },
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: 'PRODUCT_ERROR',
          payload: error.response.data,
        });
      }
    }
  };
};
