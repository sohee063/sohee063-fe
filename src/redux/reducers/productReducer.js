import { GET_PRODUCTS_SUCCESS, PRODUCT_LOADING } from '../actions/productActions';

const initialstate = {
  allProductList: [],
  loading: '',
};

const productReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        userName: payload,
      };
    case PRODUCT_LOADING:
      return {
        ...state,
        err: payload,
      };
    default:
      return state;
  }
};

export default productReducer;
