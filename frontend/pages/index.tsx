import { useEffect } from "react";
import { RootReducerState } from "@/reducers";
import wrapper from "@/store/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_POSTS_REQUEST } from "@/reducers/post";
import { LOAD_USER_INFO_REQUEST } from "@/reducers/user";
import { END } from "redux-saga";
import axios from "axios";

import Head from "next/head";

import AppLayout from "@/components/AppLayout";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootReducerState) => state.user);
  const { mainPosts, loadPostsLoading, hadMorePosts, retwittError } =
    useSelector((state: RootReducerState) => state.post);

  useEffect(() => {
    if (retwittError) {
      alert("해당 게시물을 리트윗 할 수 없습니다.");
    }
  }, [retwittError]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hadMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hadMorePosts, loadPostsLoading, dispatch]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>outstagram</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_USER_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Home;
