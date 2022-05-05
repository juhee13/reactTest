import React from 'react';
import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";
import commentSaga from "./comment";



axios.defaults.baseURL = "http://localhost:3060";
axios.defaults.withCredentials = true;

if (typeof window !== 'undefined') {
  //console.log('document.cookie', document.cookies);
  //axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
    fork(commentSaga),
  ]);
}
