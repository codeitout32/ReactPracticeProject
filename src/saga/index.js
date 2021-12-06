import { fork } from "redux-saga/effects";
import { fetchLists } from "./sagas";
import watchUserAuthentication from "./watchers";

export default function* startForman() {
  yield fork(watchUserAuthentication);
  yield fork(fetchLists);
}
