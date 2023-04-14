import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  LOAD_MY_INFO_REQUEST,
  LOAD_USER_INFO_REQUEST,
} from "../../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "@/reducers/post";

import { Avatar, Card } from "antd";
import { END } from "redux-saga";

import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import AppLayout from "../../components/AppLayout";

import axios from "axios";
import { RootReducerState } from "@/reducers";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state: RootReducerState) => state.post
  );
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePosts, loadPostsLoading, id]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta
            name="description"
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property="og:title"
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property="og:description"
            content={`${userInfo.nickname}님의 게시글`}
          />
          <meta
            property="og:image"
            content="http://locaslhost:3000/favicon.ico"
          />
          <meta
            property="og:url"
            content={`http://locaslhost:3000/user/${id}`}
          />
        </Head>
      )}
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹쨱
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
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
        type: LOAD_USER_POSTS_REQUEST,
        data: params.id,
      });

      store.dispatch({
        type: LOAD_USER_INFO_REQUEST,
        data: params.id,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default User;
