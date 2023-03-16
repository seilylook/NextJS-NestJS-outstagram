import AppLayout from "@/components/AppLayout";
import { useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";

import Head from "next/head";

import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

const Home = () => {
  const { me } = useSelector((state: RootReducerState) => state.user);
  const { mainPosts } = useSelector((state: RootReducerState) => state.post);

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
