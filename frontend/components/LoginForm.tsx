import { useCallback, useState, ChangeEvent } from "react";
import Link from "next/link";

import { Button, Form, Input } from "antd";
import styled from "styled-components";

type LoginProps = {
  onChangeId: (id: string) => void;
  onChangePassword: (password: string) => void;
};

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  return (
    <Form>
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
    </Form>
  );
};

export default LoginForm;
