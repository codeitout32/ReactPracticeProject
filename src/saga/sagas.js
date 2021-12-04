import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";

export function* helloSaga() {
  console.log("hello sagas");
}

export function* fetchLists() {
  yield takeLatest("GET_USER_LIST");
}

// function updateApi(user){
//     try {
//         yield axios
//           .post("https://api.m3o.com/v1/user/Update", user, {
//             headers,
//           })
//           .then((res) => {
//             const data = res.data;
//           })
//           .then((data) => console.log("action strUpdate", data))
//           .then(() => {
//             console.log("fetching1");
//             fetchLists(qckDispatch);
//           });
//       } catch (error) {
//         if (error.response) console.log(error.response.data);
//         else console.log(error.message);
//       }
// }
