import produce from "immer";
import { AnyAction } from "redux";
import { UserType } from "@/types/UserType";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const logInAction = (data: { email: string; password: string }) => {
  console.log(data);
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

type User = {
  id: number;
  nickname: string;
  Posts: {
    id: number;
  }[];
  Followings: {
    nickname: string;
  }[];
  Followers: {
    nickname: string;
  }[];
};

const dummyUser = (data: User) => ({
  ...data,
  nickname: "kim",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "부기초" },
    { nickname: "Chanho Lee" },
    { nickname: "neue zeal" },
  ],
  Followers: [
    { nickname: "부기초" },
    { nickname: "Chanho Lee" },
    { nickname: "neue zeal" },
  ],
});

export const initialState = {
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpData: {},
  logInData: {},
  me: {},
};

export type UserReducerState = typeof initialState;

const reducer = (state: UserReducerState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;

      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = dummyUser(action.data);
        draft.logInDone = true;
        break;

      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.me = null;
        draft.logOutDone = true;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      default:
        return {
          ...state,
        };
    }
  });

export default reducer;
