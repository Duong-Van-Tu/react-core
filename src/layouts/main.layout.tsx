/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

type MainLayoutProps = {
  children: ReactNode;
};

const { Content } = Layout;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout css={layoutStyle}>
      <Sidebar />
      <Layout>
        <Header />
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

const content = css`
  margin: 2rem;
`;
