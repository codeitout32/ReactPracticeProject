import { GET_USER_LIST } from "../actions/type";

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
    default:
      return state;
  }
};

export default listReducer;
