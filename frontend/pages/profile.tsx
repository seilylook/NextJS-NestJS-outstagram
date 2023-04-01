import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";
import Head from "next/head";
import Router from "next/router";

import AppLayout from "@/components/AppLayout";
import NicknameEditForm from "@/components/NicknameEditForm";
import FollowList from "@/components/FollowList";
import { useDispatch } from "react-redux";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "@/reducers/user";

const Profile = () => {
  const { me } = useSelector((state: RootReducerState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Profile | 내 프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
