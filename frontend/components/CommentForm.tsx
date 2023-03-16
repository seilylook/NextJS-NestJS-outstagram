import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { PostType } from "@/types/PostType";

import { Form, Input, Button } from "antd";
import useInput from "@/hooks/useInput";
import { useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";

type CommentProp = {
  post: PostType;
};

const CommentForm = ({ post }: CommentProp) => {
  const id = useSelector((state: RootReducerState) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");
  const dispatch = useDispatch();

  const onSubmitComment = useCallback(
    (e: ChangeEvent) => {
      console.log(id);
      console.log(post.id, commentText);
    },
    [commentText]
  );

  return (
    <Form onFinish={onSubmitComment}>
      <Input.TextArea
        value={commentText}
        onChange={onChangeCommentText}
        rows={4}
      />
      <Button type="primary" htmlType="submit">
        등록
      </Button>
    </Form>
  );
};

export default CommentForm;
