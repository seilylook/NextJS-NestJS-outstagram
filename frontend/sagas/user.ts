import { all, delay, fork, takeLatest, put } from "redux-saga/effects";
import { logInAction, logoutAction } from "../reducers/user";
import axios from "axios";

function logInAPI(data) {
  return axios.post("/login", data);
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/logout");
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI, action.data);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  all([fork(watchLogin), fork(watchLogOut)]);
}
