import { setList } from "./loginActions";
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { DELETE_REQUEST, LIST_REFRESH_REQUEST } from "./type";

const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_M3OTOKEN}`,
};

export const fetchLists = () => {
  //   const qckDispatch = useDispatch();

  console.log("hello fetching list");
  return {
    type: LIST_REFRESH_REQUEST,
  };
};

export const delItem = (para) => {
  console.log("hello deleting item");

  const id = { id: para };

  return {
    type: DELETE_REQUEST,
    payload: id,
  };
};

// Used to post delete without using saga
export const oldDelItem = async (qckDispatch, para) => {
  //   const qckDispatch = useDispatch();

  console.log("hello deleting item");

  const id = { id: para };

  try {
    const res = await axios.post("https://api.m3o.com/v1/user/Delete", id, {
      headers,
    });
    const data = res.data.users;

    console.log("Getting list");
    fetchLists(qckDispatch);
    // qckDispatch(setList(data));
  } catch (error) {
    if (error.response) console.log(error.response.data);
    else console.log(error.message);
  }
};
