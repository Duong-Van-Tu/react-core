/** @jsxImportSource @emotion/react */
import { useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import logo from '@/assets/images/logo.png';
import { saleMenus } from '@/modules/sales/menu.sale';
import { menuUsers } from '@/modules/users/menu.user';
import { settingMenus } from '@/modules/settings/menu-settings';
import { payrollMenus } from '@/modules/payroll/menu-payroll';
import { reportMenus } from '@/modules/reports/menu-reports';
import Menu from './menu';
import { categoryMenus } from '@/modules/category/menu.category';
import { usePermission } from '@/hooks/permission.hook';

export default function Sidebar() {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const { isAdmin } = usePermission();
  const menus = useMemo(() => {
    return [
      saleMenus,
      menuUsers,
      ...(isAdmin ? [categoryMenus] : []),
      payrollMenus,
      reportMenus,
      settingMenus,
    ];
  }, [isAdmin]);
  return (
    <Sider
      css={sidebarStyle}
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Link to={'/sales/kpi'}>
        <div css={logoStyle(collapsed ? 60 : 90, collapsed ? 60 : 90)}>
          <img src={logo} />
        </div>
      </Link>
      <Menu items={menus} />
    </Sider>
  );
}

const sidebarStyle = css`
  box-shadow: 0.03px 0.05px 3px #dbd7d7;
`;
const logoStyle = (width: number, height: number) => css`
  background: #fff;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;
  height: ${height / 10}rem;
  img {
    width: ${width / 10}rem;
  }
`;
