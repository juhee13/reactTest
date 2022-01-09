import axios from "axios";
import { fork, takeLatest, put, all, call } from "redux-saga/effects";
import {
  BOARD_ALL_REQUEST,
  BOARD_ALL_SUCCESS,
  BOARD_ALL_FAILURE,
  BOARD_WRITE_REQUEST,
  BOARD_WRITE_SUCCESS,
  BOARD_WRITE_FAILURE,
} from "../reducers/post";

function loadBoardAPI() {
  return axios.get(`/post`);
}

function* loadBoard(action) {
  try {
    const result = yield call(loadBoardAPI);
    yield put({
      type: BOARD_ALL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOARD_ALL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadBoard() {
  yield takeLatest(BOARD_ALL_REQUEST, loadBoard);
}

function writePostAPI(data) {
  return axios.post(`/post`, data);
}

function* writePost(action) {
  try {
    const result = yield call(writePostAPI, action.data);
    yield put({
      type: BOARD_WRITE_SUCCESS,
      data: result.data.result,
    });
  } catch (err) {
    console.error(err.response.data.err);
    yield put({
      type: BOARD_WRITE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchWrite() {
  yield takeLatest(BOARD_WRITE_REQUEST, writePost);
}

export default function* userSaga() {
  yield all([fork(watchLoadBoard), fork(watchWrite)]);
}
