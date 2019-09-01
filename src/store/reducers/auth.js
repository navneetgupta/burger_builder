import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  token: null,
  userId: null,
  error: null
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        loading: true,
        token: null,
        userId: null,
        error: null
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        loading: false,
        userId: action.authData.email,
        token: action.authData.idToken,
        error: null
      };
    case actionTypes.AUTH_FAILED:
      return {
        loading: false,
        token: null,
        userId: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducers;
