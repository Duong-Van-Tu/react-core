/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Menu as MenuAntd } from 'antd';
import type { MenuProps as MenuPropsAntd } from 'antd';
import { useLocation, useNavigate } from 'react-router';

type MenuItem = Required<MenuPropsAntd>['items'][number];
type MenuProps = {
  items: MenuItem[];
};
export default function Menu({ items }: MenuProps) {
  const [current, setCurrent] = useState('kpi');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleMenuItemClick: MenuPropsAntd['onClick'] = (e) => {
    const pathname = e.keyPath
      .reverse()
      .map((key) => `/${key}`)
      .join('');
    setCurrent(e.key);
    navigate(pathname);
  };

  useEffect(() => {
    const pathElements = pathname.split('/');
    const lastPathElement = pathElements[pathElements.length - 1];
    setCurrent(lastPathElement);
  }, [pathname, setCurrent]);

  return (
    <MenuAntd
      theme="light"
      mode="inline"
      defaultSelectedKeys={['kpi']}
      defaultOpenKeys={['sales']}
      css={menuStyle}
      items={items}
      selectedKeys={[current]}
      onClick={handleMenuItemClick}
    />
  );
}

const menuStyle = css`
  .ant-menu-item-selected {
    background: #9a4c1e;
    color: #fff;
    svg {
      path {
        fill: #fff;
      }
    }
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
