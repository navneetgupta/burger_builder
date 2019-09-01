import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        loading: false
      };
    case actionTypes.AUTH_FAILED:
      return {
        loading: false
      };
    default:
      return state;
  }
};

export default reducers;
