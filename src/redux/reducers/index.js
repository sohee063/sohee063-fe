import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  product: productReducer,
});

export default rootReducer;
