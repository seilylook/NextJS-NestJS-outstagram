import { useCallback, useState, ChangeEvent } from "react";
import Link from "next/link";

import { Button, Form, Input } from "antd";
import styled from "styled-components";

type LoginProps = {
  setIsLoggedIn: (diff: boolean) => void;
};

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({ setIsLoggedIn }: LoginProps) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password, setIsLoggedIn]);

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
