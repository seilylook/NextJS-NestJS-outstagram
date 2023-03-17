import { useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";
import Head from "next/head";

import AppLayout from "@/components/AppLayout";
import NicknameEditForm from "@/components/NicknameEditForm";
import FollowList from "@/components/FollowList";

const Profile = () => {
  const { me } = useSelector((state: RootReducerState) => state.user);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Profile | 내 프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Follwers} />
      </AppLayout>
    </>
  );
};

export default Profile;
