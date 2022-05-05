import axios from "axios";
import { fork, takeLatest, put, all, call } from "redux-saga/effects";
import {
  BOARD_ALL_REQUEST,
  BOARD_ALL_SUCCESS,
  BOARD_ALL_FAILURE,
  BOARD_WRITE_SUCCESS,
  BOARD_WRITE_FAILURE,
  BOARD_WRITE_REQUEST,
  BOARD_DETAIL_REQUEST,
  BOARD_DETAIL_SUCCESS,
  BOARD_DETAIL_FAILURE,
  LIKE_UPDATE_REQUEST,
  LIKE_UPDATE_SUCCESS,
  LIKE_UPDATE_FAILURE,
  DISLIKE_UPDATE_SUCCESS,
  DISLIKE_UPDATE_FAILURE, DISLIKE_UPDATE_REQUEST,
} from "../reducers/post";

function loadBoardAPI(data) {
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
  yield takeLatest(BOARD_ALL_REQUEST, loadBoard); //  2. 리퀘스트를 가로채서 loadBoard실행
}

function writePostAPI(data) {
  return axios.post(`/post`, data);
}

function* writePost(action) {
  try {
    const result = yield call(writePostAPI, action.data); // 액션의 data를 writePostApi로 보내줌
    yield put({
      type: BOARD_WRITE_SUCCESS,
      data: result.data.result,
    });
  } catch (err) {
    console.error(err.response.data.err); // 200이 아닐 때 에러
    yield put({
      type: BOARD_WRITE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchWrite() {
  yield takeLatest(BOARD_WRITE_REQUEST, writePost); //  2. 리퀘스트를 가로채서 loadBoard실행
}

function loadDetailPostAPI(data) {
  return axios.get(`/post/` + data);
}

function* loadDetailPost(action) {
  try {
    const result = yield call(loadDetailPostAPI, action.data); // 액션의 data를 writePostApi로 보내줌

    yield put({
      type: BOARD_DETAIL_SUCCESS,
      data: result.data.data[0],
      liker: result.data.liker,
      disLiker: result.data.disLiker
    });
  } catch (err) {
    console.error(err.response.data.err); // 200이 아닐 때 에러
    yield put({
      type: BOARD_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchBoardDetail() {
  yield takeLatest(BOARD_DETAIL_REQUEST, loadDetailPost); //  2. 리퀘스트를 가로채서 loadBoard실행
}

function likeUpdateAPI(data) {
  return axios.post(`/post/likeUpdate?category=L`, data);
}

function* likeUpdate(action) {
  try {
    const result = yield call(likeUpdateAPI, action.data);
    yield put({
      type: LIKE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLikeUpdate() {
  yield takeLatest(LIKE_UPDATE_REQUEST, likeUpdate); //  2. 리퀘스트를 가로채서 loadBoard실행
}


function dislikeUpdateAPI(data) {
  return axios.post(`/post/likeUpdate?category=D`, data);
}

function* dislikeUpdate(action) {
  try {
    const result = yield call(dislikeUpdateAPI, action.data);
    yield put({
      type: DISLIKE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DISLIKE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDislikeUpdate() {
  yield takeLatest(DISLIKE_UPDATE_REQUEST, dislikeUpdate); //  2. 리퀘스트를 가로채서 loadBoard실행
}

export default function* userSaga() {
  yield all([
    fork(watchLoadBoard), // 1. 리듀서 중간에 가로채는 애가 사가임. 사가가 감시하고 있다가
    fork(watchWrite),
    fork(watchBoardDetail),
    fork(watchLikeUpdate),
    fork(watchDislikeUpdate),
  ]);
}
