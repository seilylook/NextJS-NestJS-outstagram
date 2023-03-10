import Link from "next/link";
import { ReactNode } from "react";
import { Menu, Input } from "antd";

type ChildrenProp = {
  children: ReactNode;
};

const AppLayout = ({ children }: ChildrenProp) => {
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
            <Link href="/signup">회원가입</Link>
          </Menu.Item>
        </Menu>
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
