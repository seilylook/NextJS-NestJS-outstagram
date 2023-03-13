const LOG_IN = "LOG_IN" as const;

export type User = {
  id: string;
  password: string;
  nickname: string;
};

export const logIn = (user: User) => ({
  type: LOG_IN,
  payload: user,
});

type UserAction = ReturnType<typeof logIn>;

export type UserState = User[];

const initialState: UserState = [];

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case LOG_IN:
      return state.concat({
        id: action.payload.id,
        password: action.payload.password,
        nickname: action.payload.nickname,
      });

      console.log(state);

    default:
      return state;
  }
};

export default reducer;
