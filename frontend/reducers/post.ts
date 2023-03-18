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

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

const dummyPost = (data: any) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "kim",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data: any) => ({
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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
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

const reducer = (state: PostReducerState = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;

      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;

      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;

      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;

      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;

      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post?.Comments.unshift(dummyComment(action.data.content));
        break;

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
