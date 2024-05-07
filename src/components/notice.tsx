/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar, Badge, Button, List, Popover, Spin, Tabs, Tag, Tooltip } from 'antd';
import { useLocale } from '@/hooks/locale.hook';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { CustomIcon } from './icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { TabPane } = Tabs;
export default function Notice() {
  const [visible, setVisible] = useState(false);
  const noticeList: Notice[] = [];
  const loading = false;
  const noticeCount = 3;
  const { formatMessage } = useLocale();

  const noticeListFilter = <T extends Notice['type']>(type: T) => {
    return noticeList.filter((notice) => notice.type === type) as Notice<T>[];
  };

  const tabs = (
    <div>
      <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={`${formatMessage({
              id: 'app.notice.messages',
            })}(${noticeListFilter('notification').length})`}
            key="1"
          >
            <List
              dataSource={noticeListFilter('notification')}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.title}>{item.title}</a>}
                    description={item.datetime}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="tasks" key="3">
            <List
              dataSource={noticeListFilter('event')}
              renderItem={(_item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div>
                        <div>Title</div>
                        <Tag color={EventStatus['processing']}>extra</Tag>
                      </div>
                    }
                    description={'description'}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );

  return (
    <Popover
      content={tabs}
      placement="bottomRight"
      trigger={['click']}
      open={visible}
      onOpenChange={(v) => setVisible(v)}
      overlayStyle={{
        width: 336,
      }}
    >
      <Tooltip title={formatMessage({ id: 'app.notice.messages' })}>
        <Badge count={noticeCount} overflowCount={999}>
          <Button css={bellBtn}>
            <CustomIcon type="bell" width={20} height={20} color="#020202" />
          </Button>
        </Badge>
      </Tooltip>
    </Popover>
  );
}

const bellBtn = css`
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
`;
