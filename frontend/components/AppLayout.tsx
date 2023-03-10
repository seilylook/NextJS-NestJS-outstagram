import Link from "next/link";
import { ReactNode } from "react";

type ChildrenProp = {
  children: ReactNode;
};

const AppLayout = ({ children }: ChildrenProp) => {
  return (
    <div>
      <div>
        <Link href="/">outstagram</Link>
        <Link href="/profile">프로필</Link>
        <Link href="/signup">회원가입</Link>
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
