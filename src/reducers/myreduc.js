import {
  LOGIN_SUCCESS,
  USER_DATA_SUCCESS,
  LOGOUT,
  GET_USER_LIST,
  REGISTER_SUCCESS,
  UPDATE_LIST,
  UPDATE_SUCCESS,
  REGISTER_FAILED,
  REGISTER_RESET,
} from "../actions/type";

const initialState = {
  user: null,
  userData: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_FAILED:
      console.log("reducer action", action);
      return {
        ...state,
        register: false,
        response: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        register: true,
        response: "Registered Successfully",
        userData: action.response,
      };
    case REGISTER_RESET:
      console.log("resetting register");
      return {
        ...state,
        register: false,
        response: null,
        userData: action.response,
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

    case UPDATE_SUCCESS:
      return state;

    default:
      return state;
  }
};

export default loginReducer;
