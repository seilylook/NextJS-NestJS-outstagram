const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
};

export type PostAction = typeof addPost;

const dummyPost = {
  id: 2,
  content: "더미 데이터 입니다.",
  User: {
    id: 1,
    nickname: "kim",
  },
  Images: [],
  Comments: [],
};

// mainPosts = [
//  {
//      id,
//      User: {id, nickname},
//      content,
//      Images: []
//      Comments: [
//          {
//              User: { nickname},
//              content
//          }
//      ]
//  }
// ]
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "kim",
      },
      content: "첫 번째 게시글. #Next #Nest",
      Images: [
        {
          src: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__340.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg",
        },
      ],
      Comments: [
        {
          id: 1,
          User: {
            id: 2,
            nickname: "lee",
          },
          content: "첫 댓글이다",
        },
        {
          id: 2,
          User: {
            id: 3,
            nickname: "park",
          },
          content: "두번째 댓글이다.",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

export type PostReducerState = typeof initialState;

const reducer = (
  state: PostReducerState = initialState,
  action: PostAction
): PostReducerState => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
