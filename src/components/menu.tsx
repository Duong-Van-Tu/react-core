/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Menu as MenuAntd } from 'antd';
import type { MenuProps as MenuPropsAntd } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { getFirstPathCode } from '@/utils/get-pathCode';

type MenuItem = Required<MenuPropsAntd>['items'][number];
type MenuProps = {
  items: MenuItem[];
};

export default function Menu({ items }: MenuProps) {
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>();
  const [openKey, setOpenKey] = useState<string>(getFirstPathCode(pathname));

  const navigate = useNavigate();

  const handleMenuClick: MenuPropsAntd['onClick'] = (e) => {
    const pathname = e.keyPath
      .reverse()
      .map((key) => `/${key}`)
      .join('');

    navigate(pathname);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    setOpenKey(key ?? '');
  };

  useEffect(() => {
    const pathElements = pathname.split('/').filter(Boolean);
    const lastPathElement = pathElements[pathElements.length - 1];
    setSelectedKey(lastPathElement);
    setOpenKey(pathElements[0]);
  }, [pathname, setSelectedKey, setOpenKey]);

  return (
    <MenuAntd
      theme="light"
      mode="inline"
      css={menuStyle}
      items={items}
      selectedKeys={selectedKey ? [selectedKey] : []}
      openKeys={[openKey]}
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
