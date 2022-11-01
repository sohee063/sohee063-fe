import { LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/loginActions';

const initialstate = {};

const loginReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default loginReducer;
