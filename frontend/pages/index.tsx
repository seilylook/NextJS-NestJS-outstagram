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
  const { mainPosts, loadPostsLoading } = useSelector(
    (state: RootReducerState) => state.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [dispatch]);

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
