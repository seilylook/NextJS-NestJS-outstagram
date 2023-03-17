import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "@/hooks/useInput";
import Head from "next/head";
import { SIGN_UP_REQUEST } from "@/reducers/user";
import { RootReducerState } from "@/reducers";

import { Form, Input, Button, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import AppLayout from "@/components/AppLayout";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
`;

type SignUpProps = {
  onSubmit: () => void;
};

const SignUp = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const { signUpLoading } = useSelector(
    (state: RootReducerState) => state.user
  );

  const dispatch = useDispatch();

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.currentTarget.value);
      setPasswordError(e.currentTarget.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(
    (e: ChangeEvent) => {
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }

      if (!term) {
        return setTermError(true);
      }

      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, password, nickname },
      });
    },
    [email, nickname, password, passwordCheck, term]
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Sign Up | 회원가입</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit} style={{ marginBottom: "10px" }}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호 체크</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage style={{ color: "red" }}>
                비밀번호가 일치하지 않습니다.
              </ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              개인정보 제공에 동의하십니까?
            </Checkbox>
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default SignUp;
