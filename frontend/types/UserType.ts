export interface UserType {
  id: number;
  email: string;
  password: string;
  nickname: string;
  Posts: {
    id: number;
  }[];
  Followings: {
    nickname: string;
  }[];
  Followers: {
    nickname: string;
  }[];
}
