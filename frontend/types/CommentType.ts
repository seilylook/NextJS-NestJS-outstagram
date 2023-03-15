export interface CommentType {
  id: number;
  User: {
    id: number;
    nickname: string;
  };
  content: string;
}
