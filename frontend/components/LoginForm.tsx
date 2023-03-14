import { useCallback } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logInAction } from "../reducers/user";

import { Button, Form, Input } from "antd";
import styled from "styled-components";
import useInput from "@/hooks/useInput";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    dispatch(logInAction({ id, password }));
  }, [id, password, dispatch]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup" style={{ marginLeft: 5 }}>
          <Button>회원가입</Button>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
