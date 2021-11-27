import {
  LOGIN_SUCCESS,
  USER_DATA_SUCCESS,
  LOGOUT,
  GET_USER_LIST,
  REGISTER_SUCCESS,
} from "../actions/type";

const initialState = {
  user: null,
  userData: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: 1,
        userData: action.payload,
        // user: [...action.payload, ...state.user],
        // user: { action, payload, ...state.user },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        // user: [...action.payload, ...state.user],
        // user: { action, payload, ...state.user },
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default loginReducer;
