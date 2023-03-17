import { AnyAction } from "redux";
import produce from "immer";
import shortId from "shortid";
import fakerStatic from "faker";
import { PostType } from "@/types/PostType";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComent = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export type PostAction = typeof addPost;

const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "kim",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "lee",
  },
});

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
  addPostLoading: false, // 게시물 작성 시도 중
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false, // 댓글 작성 시도 중
  addCommentDone: false,
  addCommentError: null,
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
};

export type PostReducerState = typeof initialState;

const reducer = (state: PostReducerState = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
      };

    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };

    case ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCOmmentError: action.error,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
