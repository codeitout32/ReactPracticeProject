import { setList } from "./loginActions";
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_M3OTOKEN}`,
};

export const fetchLists = async (qckDispatch) => {
  //   const qckDispatch = useDispatch();

  console.log("hello fetching list");
  const limits = {
    limit: 100,
    offset: 0,
  };

  try {
    const res = await axios.post("https://api.m3o.com/v1/user/List", limits, {
      headers,
    });
    const data = res.data.users;

    console.log("dispatching list");
    qckDispatch(setList(data));
  } catch (error) {
    if (error.response) console.log(error.response.data);
    else console.log(error.message);
  }
};
export const delItem = async (qckDispatch, para) => {
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
