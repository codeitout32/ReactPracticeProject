import { put, call } from "redux-saga/effects";
import { registerService } from "../services/authenticationServices";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  DELETE_SUCCESS,
} from "../actions/type";

export function* registerSaga(payload) {
  try {
    console.log("authenticationsaga", payload);
    const response = yield call(registerService, payload);
    yield put({ type: REGISTER_SUCCESS, response });
  } catch (error) {
    const payload = error.response.data.Detail;
    console.log("error1", payload);
    yield put({ type: REGISTER_FAILED, payload });
  }
}
