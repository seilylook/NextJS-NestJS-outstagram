import { useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";
import { useDispatch } from "react-redux";
import { LOAD_POSTS_REQUEST } from "@/reducers/post";

import Head from "next/head";

import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootReducerState) => state.user);
  const { mainPosts, loadPostsLoading, hadMorePosts } = useSelector(
    (state: RootReducerState) => state.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hadMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: mainPosts[mainPosts.length - 1].id,
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

export default Home;
