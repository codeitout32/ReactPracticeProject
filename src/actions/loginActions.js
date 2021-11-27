import {
  LOGIN_SUCCESS,
  LOGOUT,
  USER_DATA_SUCCESS,
  GET_USER_LIST,
  REGISTER_SUCCESS,
} from "./type";

export const login = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};
export const getData = (user) => {
  return {
    type: USER_DATA_SUCCESS,
    payload: user,
  };
};
export const logout = () => {
  console.log("logoutactions");
  return {
    type: LOGOUT,
  };
};

export const setList = (list) => {
  console.log("action list", list);
  return {
    type: GET_USER_LIST,
    payload: list,
  };
};
export const strRegister = (user) => {
  console.log("action register", user);
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  };
};
