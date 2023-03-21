import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "@/reducers";
import { LOG_IN_REQUEST } from "@/reducers/user";

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
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { logInLoading, logInError } = useSelector(
    (state: RootReducerState) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [email, password, dispatch]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
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
        <Button type="primary" htmlType="submit" loading={logInLoading}>
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
