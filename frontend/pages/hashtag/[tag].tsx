import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { LOAD_HASHTAG_POSTS_REQUEST } from "@/reducers/post";
import { RootReducerState } from "@/reducers";
import wrapper from "@/store/configureStore";
import axios from "axios";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "@/reducers/user";

import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";

const Hashtags = () => {
  const { mainPosts, hadMorePosts, loadPostsLoading } = useSelector(
    (state: RootReducerState) => state.post
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;

  useEffect(() => {
    if (hadMorePosts && !loadPostsLoading) {
      dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag,
        lastId: mainPosts[mainPosts.length - 1]?.id,
      });
    }
  }, [dispatch, mainPosts, tag, hadMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {mainPosts.map((v) => (
        <PostCard key={v.id} post={v} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: params.tag,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Hashtags;
