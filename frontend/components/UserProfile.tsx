import { useCallback } from "react";

import styled from "styled-components";
import { Card, Avatar, Button } from "antd";

type LoginProps = {
  setIsLoggedIn: (diff: boolean) => void;
};

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = ({ setIsLoggedIn }: LoginProps) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  return (
    <Card
      actions={[
        <div key="twit">
          게시글
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>SH</Avatar>} title="seilylook" />
      <ButtonWrapper onClick={onLogOut}>로그아웃</ButtonWrapper>
    </Card>
  );
};

export default UserProfile;
