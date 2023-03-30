import React, { useCallback } from "react";
import useInput from "@/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";

import { Form, Input } from "antd";
import { CHANGE_NICKNAME_REQUEST } from "@/reducers/user";

const NicknameEditForm = () => {
  const { me } = useSelector((state: RootReducerState) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname, dispatch]);

  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px",
      }}
    >
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
        addonBefore="닉네임"
        enterButton="수정"
      />
    </Form>
  );
};

export default NicknameEditForm;
