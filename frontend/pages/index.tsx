import AppLayout from "@/components/AppLayout";
import { useSelector } from "react-redux";
import { RootReducer } from "@/reducers";

import Head from "next/head";

import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector((state: RootReducer) => state.user);
  const { mainPosts } = useSelector((state: RootReducer) => state.post);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>outstagram</title>
      </Head>
      <AppLayout>
        {isLoggedIn && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export default Home;
