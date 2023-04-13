import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";
import { LOAD_POST_REQUEST } from "@/reducers/post";
import { LOAD_MY_INFO_REQUEST } from "@/reducers/user";

import wrapper from "@/store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

import Head from "next/head";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";

const Post = () => {
  const { singlePost } = useSelector((state: RootReducerState) => state.post);
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : "http://localhost:3000/favicon.ico"
          }
        />
        {/* <meta property="og:url" content={`https://nodebird.com/post/${id}`} /> */}
      </Head>
      <PostCard post={singlePost} />
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
      console.log(req);
      store.dispatch({
        type: LOAD_POST_REQUEST,
        data: params.id,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Post;
