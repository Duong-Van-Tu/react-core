/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Menu as MenuAntd } from 'antd';
import type { MenuProps as MenuPropsAntd } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { getFirstPathCode, getLastPathCode } from '@/utils/get-pathCode';

type MenuItem = Required<MenuPropsAntd>['items'][number];
type MenuProps = {
  items: MenuItem[];
};

export default function Menu({ items }: MenuProps) {
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(getLastPathCode(pathname));
  const [openKey, setOpenKey] = useState<string>();

  const navigate = useNavigate();

  const handleMenuClick: MenuPropsAntd['onClick'] = (e) => {
    const path = e.keyPath
      .reverse()
      .map((key) => `/${key}`)
      .join('');
    navigate(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    setOpenKey(key);
  };

  useEffect(() => {
    const firstPathCode = getFirstPathCode(pathname);
    const lastPathCode = getLastPathCode(pathname);
    setSelectedKey(lastPathCode);
    setOpenKey(firstPathCode);
  }, [pathname, setSelectedKey, setOpenKey]);

  return (
    <MenuAntd
      theme="light"
      mode="inline"
      css={menuStyle}
      items={items}
      defaultOpenKeys={[getFirstPathCode(pathname)]}
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : undefined}
      onClick={handleMenuClick}
      onOpenChange={onOpenChange}
    />
  );
}

const menuStyle = css`
  .ant-menu-item-selected,
  .ant-menu-submenu-selected .ant-menu-item-selected {
    background: #9a4c1e;
    color: #fff;
    svg path {
      fill: #fff;
    }
  }

  .ant-menu-submenu-selected .ant-menu-submenu-title {
    background: #9a4c1e;
    font-size: 1.6rem;
    color: #fff;

    .ant-menu-title-content a {
      color: #fff;
    }

    &:hover {
      background: #9a4c1e;
      opacity: 0.9;
    }
  }

  .ant-menu-submenu-selected .ant-menu-submenu-title {
    svg path {
      fill: #fff;
    }
  }

  .ant-menu-sub .ant-menu-item {
    font-size: 1.4rem;
    font-weight: 500;
  }

  .ant-menu-sub .ant-menu-item-selected {
    background: unset;
    color: #9a4c1e;
    svg path {
      fill: #9a4c1e;
    }
  }

  .ant-menu-submenu-selected .ant-menu-submenu-arrow {
    color: #fff;
  }
`;
