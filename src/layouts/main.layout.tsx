/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { LogoIcon } from '../components/icons';

type MainLayoutProps = {
  children: ReactNode;
};

const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout css={layoutStyle}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div css={logoStyle}>
          <LogoIcon width={50} height={50} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: 'sale',
              icon: <UserOutlined />,
              label: 'Sale',
              children: [
                {
                  key: '1-1',
                  icon: <UserOutlined />,
                  label: 'KPI',
                },
                {
                  key: '1-2',
                  icon: <UserOutlined />,
                  label: 'Quyền lợi',
                },
              ],
            },

            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Payroll',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Reports',
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Settings',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header css={headerStyle}>
          <Breadcrumb css={breadcrumbStyle}>
            <Breadcrumb.Item>sales</Breadcrumb.Item>
            <Breadcrumb.Item>hello</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content css={content}>{children}</Content>
      </Layout>
    </Layout>
  );
}

const layoutStyle = css`
  min-height: 100vh;
  .ant-layout-sider-light .ant-layout-sider-trigger {
    background: #e8e7e7;
  }
`;

const logoStyle = css`
  background: #fff;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
  }
`;

const headerStyle = css`
  background: #fff;
  padding: 0 3rem;
  border-bottom: 0.5px solid #edebeb;
`;

const breadcrumbStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
`;
const content = css`
  margin: 2rem;
`;
