import {
  CREATE_USER,
  CHECK_USERNAME,
  CHECK_EMAIL,
  LOGIN,
  SIGN_OUT,
} from "../actions/types";

const intitalState = {
  isSignedIn: null,
  userId: null,
  email_check: [],
  username_check: [],
};

export default (state = intitalState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload._id,
      };

    case CHECK_USERNAME:
      return {
        ...state,
        username_check: action.payload,
      };
    case CHECK_EMAIL:
      return {
        ...state,
        email_check: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        isSignedIn: action.payload.success,
        userId: action.payload.user._id,
      };

    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: action.payload,
        userId: null,
      };
    default:
      return state;
  }
};
