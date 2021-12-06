import axios from "axios";
import { headers } from "./header";

export const deleteService = (id) => {
  console.log("hello from dltservice", id);

  return axios.post("https://api.m3o.com/v1/user/Delete", id, {
    headers,
  });
};
