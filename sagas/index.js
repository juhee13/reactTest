import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";
import commentSaga from "./comment";

axios.defaults.baseURL = "http://localhost:3060";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    //fork(userSaga),
    //fork(commentSaga)
  ]);
}
