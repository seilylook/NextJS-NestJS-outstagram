import { ChangeEvent, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PostType } from "@/types/PostType";
import { ADD_COMMENT_REQUEST } from "@/reducers/post";

import { Form, Input, Button } from "antd";
import useInput from "@/hooks/useInput";
import { useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";

type CommentProp = {
  post: PostType;
};

const CommentForm = ({ post }: CommentProp) => {
  const id = useSelector((state: RootReducerState) => state.user.me?.id);
  const { addCommentLoading, addCommentDone } = useSelector(
    (state: RootReducerState) => state.post
  );
  const [commentText, onChangeCommentText, setText] = useInput("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (addCommentDone) {
      setText("");
    }
  }, [addCommentDone, setText]);

  const onSubmitComment = useCallback(
    (e: ChangeEvent) => {
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { content: commentText, userId: id, postId: post.id },
      });
    },
    [commentText, id, post.id, dispatch]
  );

  return (
    <Form onFinish={onSubmitComment}>
      <Input.TextArea
        value={commentText}
        onChange={onChangeCommentText}
        rows={4}
      />
      <Button type="primary" htmlType="submit" loading={addCommentLoading}>
        등록
      </Button>
    </Form>
  );
};

export default CommentForm;
