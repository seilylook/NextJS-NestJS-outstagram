import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import user, { UserReducerState } from "./user";
import post, { PostReducerState } from "./post";

export interface RootReducerState {
  user: UserReducerState;
  post: PostReducerState;
}

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
