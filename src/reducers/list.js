import { GET_USER_LIST, LOGOUT } from "../actions/type";

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
    case LOGOUT:
      console.log("logout from list reducer");
      return initialState;
    default:
      return state;
  }
};

export default listReducer;
