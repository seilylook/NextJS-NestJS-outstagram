import { useCallback, useRef, useEffect, ChangeEvent } from "react";
import useInput from "@/hooks/useInput";

import { useSelector, useDispatch } from "react-redux";
import { RootReducerState } from "@/reducers";
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from "@/reducers/post";

import { Form, Input, Button } from "antd";
import { TwitterOutlined } from "@ant-design/icons";

const PostForm = () => {
  const [text, onChangeText, setText] = useInput("");
  const { imagePaths, addPostDone } = useSelector(
    (state: RootReducerState) => state.post
  );
  const dispatch = useDispatch();
  const imageInput = useRef(null);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone, setText]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요.");
    }
    const formData = new FormData();

    imagePaths.forEach((p) => {
      formData.append("image", p);
    });
    formData.append("content", text);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths, dispatch]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeImages = useCallback(
    (e: ChangeEvent) => {
      console.log("images", e.target.files);
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append("image", f);
      });
      dispatch({
        type: UPLOAD_IMAGES_REQUEST,
        data: imageFormData,
      });
    },
    [dispatch]
  );

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
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          loading={false}
        >
          <TwitterOutlined />
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={`http://localhost:3060/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />
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
