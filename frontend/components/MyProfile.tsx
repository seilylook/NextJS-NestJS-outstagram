import { useCallback } from "react";
import { LOG_OUT_REQUEST } from "../reducers/user";
import { RootReducerState } from "@/reducers";

import styled from "styled-components";
import { Card, Avatar, Button } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;

const MyProfile = () => {
  const { me, logOutLoading } = useSelector(
    (state: RootReducerState) => state.user
  );
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [dispatch]);

  return (
    <Card
      actions={[
        <div key="twit">
          게시글
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <ButtonWrapper onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </ButtonWrapper>
    </Card>
  );
};

export default MyProfile;
