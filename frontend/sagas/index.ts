import { fork, all } from "redux-saga/effects";

import userSaga from "./user";
import postSaga from "./post";

export default function* rootSaga() {
  all([fork(userSaga), fork(postSaga)]);
}
