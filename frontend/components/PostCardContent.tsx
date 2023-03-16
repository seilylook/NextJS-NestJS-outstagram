import Link from "next/link";

type PostCardContentProp = {
  postData: string;
};

const PostCardContent = ({ postData }: PostCardContentProp) => {
  //첫 번째 게시글. #Next #Nest
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v) => {
        if (v.match(/(#[^\s]+)/)) {
          return (
            <Link
              href={{ pathname: "/hashtag", query: { tag: v.slice(1) } }}
              as={`/hashtag/${v.slice(1)}`}
              key={v}
            >
              {v}
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostCardContent;
