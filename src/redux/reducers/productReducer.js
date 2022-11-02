import {
  GET_ALL_PRODUCTS_SUCCESS,
  GET_DETAIL_PRODUCTS_SUCCESS,
  GET_SCROLL_PRODUCTS_SUCCESS,
  PRODUCT_LOADING,
  PRODUCT_ERROR,
} from '../actions/productActions';

const initialstate = {
  allProductList: [],
  scrollProductList: [],
  productDetail: [],
  totalCount: '',
  loading: '',
  err: '',
};

const productReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  console.log('페이로드', payload);
  switch (type) {
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProductList: payload.allProductList.data.products,
        totalCount: payload.allProductList.data.totalCount,
      };
    case GET_SCROLL_PRODUCTS_SUCCESS:
      return {
        ...state,
        scrollProductList: [...state.scrollProductList, ...payload.scrollProductList.data.products],
        totalCount: payload.scrollProductList.data.totalCount,
      };
    case GET_DETAIL_PRODUCTS_SUCCESS:
      return {
        ...state,
        productDetail: payload.productDetail.data.product,
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        err: payload,
      };
    default:
      return state;
  }
};

export default productReducer;
