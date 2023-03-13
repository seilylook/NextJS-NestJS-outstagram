const LOG_IN = "LOG_IN" as const;
const LOG_OUT = "LOG_OUT" as const;

export const logIn = (data: User) => ({
  type: LOG_IN,
  data,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export type User = {
  id: number;
  user_id: string;
  password: string;
  nickname: string;
};

export type UserAction = ReturnType<typeof logIn> | ReturnType<typeof logOut>;

export const initialState = {
  isLoggedIn: false,
  signUpData: {},
  loginData: {},
  user: null,
};

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };

    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default reducer;
