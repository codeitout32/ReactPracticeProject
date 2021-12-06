import { REGISTER_REQUEST } from "./type";

export const strRegister = (user) => {
  console.log("action register request started", user);
  return {
    type: REGISTER_REQUEST,
    payload: user,
  };
};
