import axios from "axios";
import { fork, takeLatest, put, all, call } from "redux-saga/effects";
import {
    LOAD_USER_FAILURE, LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS
} from "../reducers/user";


function logInUserAPI(data) {
    return axios.post(`/auth/login`, data );
}

function* logInUser(action) {
    try {
        const result = yield call(logInUserAPI, action.data);
        console.log('result', result);
        yield put({
            type: LOGIN_USER_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOGIN_USER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchUserLogin() {
    yield takeLatest(LOGIN_USER_REQUEST, logInUser); //  2. 리퀘스트를 가로채서 loadBoard실행
}


function loadUserAPI(data) {
    return axios.get(`/user/` + data.seq);
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_USER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser); //  2. 리퀘스트를 가로채서 loadBoard실행
}


export default function* userSaga() {
    yield all([
        fork(watchUserLogin), // 1. 리듀서 중간에 가로채는 애가 사가임. 사가가 감시하고 있다가
        fork(watchLoadUser), // 1. 리듀서 중간에 가로채는 애가 사가임. 사가가 감시하고 있다가

    ]);
}
