import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  GET_USER_LIST,
  LOGOUT,
  UPDATE_LIST,
} from "../actions/type";

const initialState = {
  list: null,
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        list: action.payload,
      };
    // case UPDATE_LIST:
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };
    case DELETE_REQUEST:
      return {
        ...state,
        deleting: true,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        deleting: false,
        response: action.payload,
      };
    case LOGOUT:
      console.log("logout from list reducer");
      return initialState;
    default:
      return state;
  }
};

export default listReducer;
