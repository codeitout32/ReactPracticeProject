import { put, call } from "redux-saga/effects";
import { DELETE_SUCCESS, DELETE_FAILED } from "../actions/type";
import { deleteService } from "../services/listServices";
import { refreshList } from "./sagas";
import { REFRESH_SUCCESS, REFRESH_FAILED } from "../actions/type";
import { fetchLists } from "../actions/listActions";

export function* deleteSaga(action) {
  try {
    console.log("deleting", action.payload);
    yield call(deleteService, action.payload);
    yield put({ type: DELETE_SUCCESS });
    yield put(fetchLists());
  } catch (error) {
    const payload = error.response.data.Detail;
    console.log("error1", payload);
    yield put({ type: DELETE_FAILED, payload });
  }
}

export function* refreshSaga() {
  try {
    console.log("refreshing started");
    yield call(refreshList);
    yield put({ type: REFRESH_SUCCESS });
  } catch (error) {
    const payload = error.response.data.Detail;
    console.log("refresh error1", payload);
    yield put({ type: REFRESH_FAILED, payload });
  }
}
