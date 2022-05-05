import axios from "axios";
import { fork, takeLatest, put, all, call } from "redux-saga/effects";
import {
  COMMENT_LOAD_FAILURE,
  COMMENT_LOAD_REQUEST,
  COMMENT_LOAD_SUCCESS,
  COMMENT_WRITE_FAILURE,
  COMMENT_WRITE_REQUEST,
  COMMENT_WRITE_SUCCESS,
  RECOMMENT_WRITE_FAILURE,
  RECOMMENT_WRITE_REQUEST,
  RECOMMENT_WRITE_SUCCESS,
} from "../reducers/comment";

function commentWritePostAPI(data) {
  return axios.post(`/comment/` + data.board_seq, data);
}

function* commentWritePost(action) {
  try {
    const result = yield call(commentWritePostAPI, action.data); // 액션의 data를 writePostApi로 보내줌
    yield put({
      type: COMMENT_WRITE_SUCCESS,
      data: action.data,
      seq: result.data.data,
    });
  } catch (err) {
    console.error(err.response); // 200이 아닐 때 에러
    yield put({
      type: COMMENT_WRITE_FAILURE,
      error: err.response,
    });
  }
}

function* watchCommentWrite() {
  yield takeLatest(COMMENT_WRITE_REQUEST, commentWritePost); //  2. 리퀘스트를 가로채서 loadBoard실행
}

function* reCommentWritePost(action) {
  try {
    const result = yield call(commentWritePostAPI, action.data); // 액션의 data를 writePostApi로 보내줌
    yield put({
      type: RECOMMENT_WRITE_SUCCESS,
      data: action.data,
      seq: result.data.data,
    });
  } catch (err) {
    console.error(err.response); // 200이 아닐 때 에러
    yield put({
      type: RECOMMENT_WRITE_FAILURE,
      error: err.response,
    });
  }
}

function* watchReCommentWrite() {
  yield takeLatest(RECOMMENT_WRITE_REQUEST, reCommentWritePost); //  2. 리퀘스트를 가로채서 loadBoard실행
}

function commentLoadAPI(data) {
  return axios.get(`/comment/` + data);
}

function* commentLoad(action) {
  try {
    const result = yield call(commentLoadAPI, action.data); // 액션의 data를 writePostApi로 보내줌
    yield put({
      type: COMMENT_LOAD_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    console.error(err.response.data.err); // 200이 아닐 때 에러
    yield put({
      type: COMMENT_LOAD_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(COMMENT_LOAD_REQUEST, commentLoad); //  2. 리퀘스트를 가로채서 loadBoard실행
}

export default function* commentSaga() {
  yield all([
    fork(watchLoadComments), // 1. 리듀서 중간에 가로채는 애가 사가임. 사가가 감시하고 있다가
    fork(watchCommentWrite),
    fork(watchReCommentWrite),
  ]);
}
