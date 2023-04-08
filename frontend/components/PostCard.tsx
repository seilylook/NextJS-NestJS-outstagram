import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerState } from "@/reducers";
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWITT_REQUEST,
} from "@/reducers/post";

import { PostType } from "@/types/PostType";
import { CommentType } from "@/types/CommentType";

import { Card, Button, Popover, Avatar, List } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  LikeOutlined,
  LikeTwoTone,
  MessageOutlined,
  RetweetOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";

type PostProp = {
  post: PostType;
};

const PostCard = ({ post }: PostProp) => {
  const { me } = useSelector((state: RootReducerState) => state.user);
  const id = me?.id;
  const { removePostLoading } = useSelector(
    (state: RootReducerState) => state.post
  );
  const liked = post.Likes.find((v) => v.userId === id);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const dispatch = useDispatch();

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }

    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [dispatch, post.id, id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }

    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [dispatch, post.id, id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }

    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [dispatch, post.id, id]);

  const onReTwitt = useCallback(() => {
    if (!id) {
      return alert("로그인을 먼저해야 합니다.");
    }

    return dispatch({
      type: RETWITT_REQUEST,
      data: post.id,
    });
  }, [dispatch, post.id, id]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Card
        cover={
          post.Images && post.Images[0] && <PostImages images={post.Images} />
        }
        actions={[
          <RetweetOutlined key="retwitt" onClick={onReTwitt} />,
          liked ? (
            <LikeTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnLike}
            />
          ) : (
            <LikeOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>
                      <EditOutlined />
                    </Button>
                    <Button
                      danger
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      <DeleteOutlined />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button>
                      <WarningOutlined />
                    </Button>
                  </>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.Retweet ? `${post.User.nickname}님이 리트윗했습니다.` : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.Retweet && post.Retweet.id ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <div>
          {me && <CommentForm post={post} />}
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item: CommentType) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={<div>{item.User.nickname}</div>}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
