import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import user from "./user";

const rootReducer = () => {
  combineReducers({
    user,
  });
};

export default rootReducer;
