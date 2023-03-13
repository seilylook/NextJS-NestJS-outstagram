const ADD_POST = "ADD_POST" as const;

export const addPost = (data: Post) => ({
  type: ADD_POST,
  data,
});

export type Post = {
  id: number;
  text: string;
  commend: string;
};

export type PostAction = ReturnType<typeof addPost>;

const initialState = {
  mainPosts: [],
};

const reducer = (state = initialState, action: PostAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
