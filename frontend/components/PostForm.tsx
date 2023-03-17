import { useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerState } from "@/reducers";
import { addPost, ADD_POST_REQUEST } from "@/reducers/post";

import { Form, Input, Button } from "antd";
import useInput from "@/hooks/useInput";

const PostForm = () => {
  const [text, onChangeText, setText] = useInput("");
  const { imagePaths, addPostDone } = useSelector(
    (state: RootReducerState) => state.post
  );
  const dispatch = useDispatch();
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone, setText]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: text,
    });
  }, [dispatch, text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, []);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="최근 근황을 알려주세요."
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          style={{ display: "none" }}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          loading={false}
        >
          삐약
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
