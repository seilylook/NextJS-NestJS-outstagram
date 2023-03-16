import { all, fork, put, call, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

function addPostAPI(data) {
  return axios.post("/", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
