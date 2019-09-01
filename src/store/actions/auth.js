import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = data => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: data
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

export const auth = (email, password) => {
  console.log(email, password);
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhby0-pgUeJEYA3oOy8ytVjqba__kGlvM",
        authData
      )
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFailed(err));
      });
    // setTimeout(() => {
    //   dispatch(authSuccess({ success: true }));
    // }, 2000);
  };
};
