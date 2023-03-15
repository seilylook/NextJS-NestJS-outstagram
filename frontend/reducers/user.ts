import produce from "immer";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const logInAction = (data: User) => {
  console.log(data);
  return {
    type: LOG_IN,
    data,
  };
};

export const logoutAction = () => {
  return {
    type: LOG_OUT,
  };
};

export type UserActions =
  | ReturnType<typeof logInAction>
  | ReturnType<typeof logoutAction>;

type User = {
  id: string;
  password: string;
};

export type UserState = User[];

const dummyUser = {
  id: 100,
  nickname: "admin",
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  signUpData: {},
  logInData: {},
  me: null || {},
};

export type UserReducerState = typeof initialState;

const reducer = (
  state: UserReducerState = initialState,
  action: UserActions
): UserReducerState => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        me: dummyUser,
        logInData: action.data,
      };

    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
