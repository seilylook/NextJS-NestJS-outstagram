import { AnyAction } from "redux";
import produce from "immer";
import shortId from "shortid";
import fakerStatic from "faker";
import { PostType } from "@/types/PostType";

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

  removePostLoading: false, // 게시글 삭제 시도 중
  removePostDone: false,
  removePostError: null,

  loadPostsLoading: false, // 모든 게시글 로드 중
  loadPostsDone: false,
  loadPostsError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  hadMorePosts: true,
  mainPosts: [],
  imagePaths: [],
};

export type PostReducerState = typeof initialState;

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

const reducer = (state: PostReducerState = initialState, action: AnyAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hadMorePosts = draft.mainPosts.length < 50;
        break;

      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;

      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
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
        // 서버에서 들어오는 id는 number가 될 거다.
        console.log(action.data);
        post?.Comments.unshift(action.data);
        break;

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;

      case LIKE_POST_SUCCESS: {
        draft.likePostLoading = false;
        draft.likePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Likes.push({ id: action.data.userId });
        break;
      }

      case LIKE_POST_FAILURE:
        draft.likePostDone = false;
        draft.likePostError = action.error;
        break;

      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;

      case UNLIKE_POST_SUCCESS: {
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Likes = post.Likes.filter((v) => v.id !== action.data.userId);
        break;
      }

      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      default:
        break;
    }
  });

export default reducer;
