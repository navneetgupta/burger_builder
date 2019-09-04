import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  loading: false,
  token: null,
  userId: null,
  error: null,
  authRedirectPath: "/"
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
    case actionTypes.SET_AUTH_REDIRECT:
      return updateObject(state, {
        authRedirectPath: action.path
      });
    default:
      return updateObject(state, {});
  }
};

export default reducers;
