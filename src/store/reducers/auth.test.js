import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("AuthReducer", () => {
  it("should return the initialState", () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      token: null,
      userId: null,
      error: null,
      authRedirectPath: "/"
    });
  });
  it("should stror token upon login", () => {
    expect(
      reducer(
        {
          loading: false,
          token: null,
          userId: null,
          error: null,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          authData: {
            localId: "MyUserID",
            idToken: "MySEcretToken"
          }
        }
      )
    ).toEqual({
      loading: false,
      token: "MySEcretToken",
      userId: "MyUserID",
      error: null,
      authRedirectPath: "/"
    });
  });
});
