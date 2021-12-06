import { takeLatest } from "redux-saga/effects";
import { registerSaga } from "./authenticationSaga";
import { deleteSaga } from "./listEditingSaga";
import { refreshSaga } from "./listEditingSaga";

import {
  DELETE_REQUEST,
  REGISTER_REQUEST,
  LIST_REFRESH_REQUEST,
} from "../actions/type";

export default function* watchUserAuthentication() {
  console.log("hello register watcher");
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(DELETE_REQUEST, deleteSaga);
  yield takeLatest(LIST_REFRESH_REQUEST, refreshSaga);
}
