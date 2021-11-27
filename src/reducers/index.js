import { combineReducers } from "redux";
// import auth from "./auth";
// import message from "./message";

//Current reducers
import loginReducer from "./myreduc";
import listReducer from "./list";

export default combineReducers({
  session: loginReducer,
  list: listReducer,
});
