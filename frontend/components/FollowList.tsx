import React, { FC } from "react";
import { List, Card, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";

type FollowInfo = {
  nickname: string;
};

interface Props {
  header: string;
  data: FollowInfo[];
}

const FollowList: FC<Props> = ({ header, data }) => {
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
              <Card.Meta description={item.nickname} />
            </Card>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FollowList;
