import { useCallback } from "react";
import { logoutAction } from "../reducers/user";

import styled from "styled-components";
import { Card, Avatar, Button } from "antd";
import { useDispatch } from "react-redux";

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

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
