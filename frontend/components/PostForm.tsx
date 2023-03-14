import { ChangeEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "@/reducers";

import { Form, Input, Button } from "antd";
import useInput from "@/hooks/useInput";

const PostForm = () => {
  const [text, setText] = useState("");
  const { imagePaths } = useSelector((state: RootReducer) => state.post);

  const onSubmit = useCallback(() => {}, []);

  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    },
    [setText]
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
          style={{ display: "none" }}
        />
        <Button>이미지 업로드</Button>
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
