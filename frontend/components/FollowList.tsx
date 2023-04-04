import { List, Card, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";

type FollowInfo = {
  Following: {
    id: number;
    nickname: string;
  };
  nickname: string;
};

type Props = {
  header: string;
  data: FollowInfo[];
};

const FollowList = ({ header, data }: Props) => {
  console.log("들어온 데이터", data);
  return (
    <List
      style={{ marginBottom: "20px" }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: "20px" }}>
          <Card>
            <Card actions={[<StopOutlined key="stop" />]}>
              {item.Following && (
                <Card.Meta description={item.Following.nickname} />
              )}
            </Card>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
