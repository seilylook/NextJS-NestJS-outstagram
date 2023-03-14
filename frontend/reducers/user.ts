import produce from "immer";

export type User = {
  id: string;
  password: string;
};

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  logInData: {},
};

export type UserReducerState = typeof initialState;

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const logInAction = (data: User) => {
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

const reducer = (
  state: UserReducerState = initialState,
  action: UserActions
): UserReducerState => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
        logInData: action.data,
      };

    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
