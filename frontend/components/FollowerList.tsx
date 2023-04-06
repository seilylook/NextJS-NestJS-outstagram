import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { REMOVE_FOLLOWER_REQUEST } from "@/reducers/user";

import { List, Card, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";

type FollowInfo = {
  Follower: {
    id: number;
    nickname: string;
  };
  nickname: string;
};

type Props = {
  header: string;
  data: FollowInfo[];
};

const FollowerList = ({ header, data }: Props) => {
  const dispatch = useDispatch();
  const removeFollower = useCallback(
    (id: number) => {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    },
    [dispatch]
  );

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
      renderItem={(item) => {
        return (
          item.Follower && (
            <List.Item style={{ marginTop: "20px" }}>
              <Card>
                <Card
                  actions={[
                    <StopOutlined
                      key="stop"
                      onClick={() => removeFollower(item.Follower.id)}
                    />,
                  ]}
                >
                  <Card.Meta
                    style={{ textAlign: "center" }}
                    description={item.Follower.nickname}
                  />
                </Card>
              </Card>
            </List.Item>
          )
        );
      }}
    />
  );
};

export default FollowerList;
