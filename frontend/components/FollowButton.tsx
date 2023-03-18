import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerState } from "@/reducers";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "@/reducers/user";

import { PostType } from "@/types/PostType";

import { Button } from "antd";

type PostProp = {
  post: PostType;
};

const FollowButton = ({ post }: PostProp) => {
  const { me, followLoading, unfollowLoading } = useSelector(
    (state: RootReducerState) => state.user
  );
  const isFollowing = me && me.Followings.find((v) => v.id === post.User.id);
  const dispatch = useDispatch();

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: {
          id: post.User.id,
          nickname: post.User.nickname,
        },
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: {
          id: post.User.id,
          nickname: post.User.nickname,
        },
      });
    }
  }, [isFollowing, dispatch, post.User.id, post.User.nickname]);

  return (
    <Button onClick={onClickButton} loading={followLoading || unfollowLoading}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

export default FollowButton;
