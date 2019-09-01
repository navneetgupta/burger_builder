import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  token: null,
  userId: null,
  error: null
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {
        loading: true,
        token: null,
        userId: null,
        error: null
      });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        loading: false,
        userId: action.authData.localId,
        token: action.authData.idToken,
        error: null
      });
    case actionTypes.AUTH_FAILED:
      return updateObject(state, {
        loading: false,
        token: null,
        userId: null,
        error: action.error
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        loading: false,
        token: null,
        userId: null,
        error: null
      });
    default:
      return updateObject(state, {});
  }
};

export default reducers;
