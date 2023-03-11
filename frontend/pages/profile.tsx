import Head from "next/head";
import AppLayout from "@/components/AppLayout";
import NicknameEditForm from "@/components/NicknameEditForm";
import FollowList from "@/components/FollowList";

const Profile = () => {
  const followerList = [
    {
      nickname: "Kim",
    },
    {
      nickname: "Lee",
    },
    {
      nickname: "Park",
    },
  ];
  const followingList = [
    {
      nickname: "Kim",
    },
    {
      nickname: "Lee",
    },
    {
      nickname: "Park",
    },
  ];
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Profile | 내 프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={followingList} />
        <FollowList header="팔로워" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
