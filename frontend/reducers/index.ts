import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import user, { UserReducerState } from "./user";
import post, { PostReducerState } from "./post";

export interface RootReducerState {
  user: UserReducerState;
  post: PostReducerState;
}

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;

    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
