// import axios from "axios";
import {
  takeEvery,
  takeLatest,
  call,
  put,
  all,
  fork,
} from "redux-saga/effects";
import { setList } from "../actions/loginActions";
import { UPDATE_LIST, GET_USER_LIST } from "../actions/type";
import { fetchApiList, strUpdate } from "./sagaActions";

const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_M3OTOKEN}`,
};

export function* helloSaga() {
  console.log("hello sagas");
  yield all([fetchLists()]);
}

export function* fetchLists() {
  console.log("hello from fetchlists saga");
  yield takeEvery(UPDATE_LIST, updateApi);
}

function* updateApi({ payload }) {
  console.log("update saga payload", payload);
  try {
    const updated = yield call(strUpdate, payload);

    console.log("api updated");

    yield call(refreshList);
  } catch (error) {
    if (error.response) console.log(error.response.data);
    else console.log(error.message);
  }
}

export function* refreshList() {
  console.log("Refreshing list");
  try {
    const resList = yield call(fetchApiList);
    console.log("going to put list in stor");
    console.log("reslist", resList);
    yield put(setList(resList));
  } catch (error) {
    if (error.response) console.log("fetching error", error.response.data);
    else console.log(error.message);
  }
}
