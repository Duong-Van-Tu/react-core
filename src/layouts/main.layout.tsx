/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useState } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { LogoIcon } from '../components/icons';
import { useRootSelector } from '../hooks/selector.hook';
import { Link } from 'react-router-dom';
import Menu from '../components/menu';
import { saleMenus } from '../modules/sales/menu-sale';
import { settingMenus } from '../modules/settings/menu-settings';

type MainLayoutProps = {
  children: ReactNode;
};

const { Header, Sider, Content } = Layout;

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const breadCrumbItems = useRootSelector((state) => state.breadcrumb.items);
  return (
    <Layout css={layoutStyle}>
      <Sider
        css={sidebarStyle}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div css={logoStyle}>
          <LogoIcon width={60} height={60} />
        </div>
        <Menu items={[...saleMenus, ...settingMenus]} />
      </Sider>
      <Layout>
        <Header css={headerStyle}>
          {breadCrumbItems.length > 0 && (
            <Breadcrumb
              css={breadcrumbStyle}
              items={breadCrumbItems.map((item) =>
                item.link
                  ? { title: <Link to={item.link}>{item.title}</Link> }
                  : { title: item.title },
              )}
            />
          )}
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

const sidebarStyle = css`
  box-shadow: 0.03px 0.05px 3px #dbd7d7;
`;
const logoStyle = css`
  background: #fff;
  height: 6rem;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
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
  li:last-child {
    .ant-breadcrumb-link a {
      color: #1f1e1e;
    }
  }
`;
const content = css`
  margin: 2rem;
`;
