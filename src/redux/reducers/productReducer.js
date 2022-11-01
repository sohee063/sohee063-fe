import { GET_PRODUCTS_SUCCESS, PRODUCT_LOADING } from '../actions/productActions';

const initialstate = {
  allProductList: [],
  totalCount: '',
  loading: '',
};

const productReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProductList: payload.allProductList.data.products,
        totalCount: payload.allProductList.data.totalCount,
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    default:
      return state;
  }
};

export default productReducer;
