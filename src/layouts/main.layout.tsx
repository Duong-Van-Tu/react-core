/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Suspense } from 'react';
import { Layout } from 'antd';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export default function MainLayout() {
  return (
    <Layout css={layoutStyle}>
      <Sidebar />
      <Layout>
        <Header />
        <Content css={content}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
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
  padding: 4rem;
  background: #fff;
`;
