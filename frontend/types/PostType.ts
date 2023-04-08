export interface PostType {
  id: number;
  User: {
    id: number;
    nickname: string;
  };
  content: string;
  Images: {
    src: string;
  }[];
  Comments: {
    id: number;
    User: {
      id: number;
      nickname: string;
    };
    content: string;
  }[];
  Likes: {
    User: {
      id: number;
      nickname: string;
    };
  }[];
  Retweet: {
    User: {
      id: number;
      nickname: string;
    };
    content: string;
    Images: {
      src: string;
    }[];
    Comments: {
      id: number;
      User: {
        id: number;
        nickname: string;
      };
      content: string;
    };
    Likes: {
      User: {
        id: number;
        nickname: string;
      };
    }[];
  }[];
}
