import { ReactNode, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerState } from "@/reducers";
import Link from "next/link";

import { Menu, Input, Row, Col } from "antd";
import styled from "styled-components";
import { SendOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

type ChildrenProp = {
  children: ReactNode;
};

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }: ChildrenProp) => {
  const { me } = useSelector((state: RootReducerState) => state.user);

  return (
    <div>
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">outstagram</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/profile">
              <UserOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <SearchInput enterButton />
          </Menu.Item>
          <Menu.Item>
            <Link href="/signup">
              <UserAddOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <SendOutlined />
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
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
