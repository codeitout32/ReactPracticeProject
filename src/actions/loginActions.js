import {
  LOGIN_SUCCESS,
  LOGOUT,
  USER_DATA_SUCCESS,
  GET_USER_LIST,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_LIST,
} from "./type";

import axios from "axios";
import { fetchLists } from "./listActions";

const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_M3OTOKEN}`,
};

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
  console.log("action lists", list);

  return {
    type: GET_USER_LIST,
    payload: list,
  };
};

export const updateList = (user) => {
  console.log("updating action lists");

  return {
    type: UPDATE_LIST,
    payload: user,
  };
};

export const strRegister = (user) => {
  console.log("action register", user);
  return {
    type: REGISTER_REQUEST,
    payload: user,
  };
};
export const strUpdate = (user, qckDispatch) => {
  console.log("hello from update action");
  try {
    axios
      .post("https://api.m3o.com/v1/user/Update", user, {
        headers,
      })
      .then((res) => {
        const data = res.data;
      })
      .then((data) => console.log("action strUpdate", data))
      .then(() => {
        console.log("fetching1");
        fetchLists(qckDispatch);
      });
  } catch (error) {
    if (error.response) console.log(error.response.data);
    else console.log(error.message);
  }

  // console.log("action strUpdate", data);
  return {
    type: UPDATE_SUCCESS,
    payload: user,
  };
};
