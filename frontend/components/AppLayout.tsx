import { ReactNode, useState } from "react";
import Link from "next/link";

import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

type ChildrenProp = {
  children: ReactNode;
};

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }: ChildrenProp) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">outstagram</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/profile">프로필</Link>
          </Menu.Item>
          <Menu.Item>
            <SearchInput enterButton />
          </Menu.Item>
          <Menu.Item>
            <Link href="/signup">회원가입</Link>
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {isLoggedIn ? (
              <UserProfile setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a
              href="https://github.com/seilylook"
              target="_blank"
              rel="noreferrer noopener"
            >
              Made By seilylook
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AppLayout;