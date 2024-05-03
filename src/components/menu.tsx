/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Menu as MenuAntd } from 'antd';
import type { GetProp, MenuProps as MenuPropsAntd } from 'antd';

type MenuItem = GetProp<MenuPropsAntd, 'items'>[number];
type MenuProps = {
  items: MenuItem[];
};
export default function Menu({ items }: MenuProps) {
  return (
    <MenuAntd
      theme="light"
      mode="inline"
      defaultSelectedKeys={['kpi']}
      defaultOpenKeys={['sales']}
      css={menuStyle}
      items={items}
    />
  );
}

const menuStyle = css`
  .ant-menu-item-selected {
    background: #9a4c1e;
    color: #fff;
  }
  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      background: #9a4c1e;
      font-size: 1.6rem;
      color: #fff;
      .ant-menu-title-content {
        a {
          color: #fff;
        }
      }
      &:hover {
        background: #9a4c1e;
        opacity: 0.9;
      }
    }
    .ant-menu-submenu-arrow {
      color: #fff;
    }
  }
  .ant-menu-sub {
    .ant-menu-item {
      font-size: 1.4rem;
      font-weight: 500;
    }
    .ant-menu-item-selected {
      background: unset;
      color: #9a4c1e;
    }
  }
`;
