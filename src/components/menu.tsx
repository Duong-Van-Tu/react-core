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
type LevelKeysProps = {
  key?: string;
  children?: LevelKeysProps[];
};

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

export default function Menu({ items }: MenuProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[] | undefined>(undefined);
  const [openKeys, setOpenKeys] = useState<string[] | undefined>(undefined);
  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuItemClick: MenuPropsAntd['onClick'] = (e) => {
    const pathname = e.keyPath
      .reverse()
      .map((key) => `/${key}`)
      .join('');

    navigate(pathname);
  };

  const onOpenMenuItemChange: MenuPropsAntd['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => openKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setOpenKeys(openKeys);
    }
  };

  useEffect(() => {
    const pathElements = pathname.split('/').filter(Boolean);
    const lastPathElement = pathElements[pathElements.length - 1];
    setSelectedKeys([lastPathElement]);
  }, [pathname, setSelectedKeys, setOpenKeys]);

  return (
    <MenuAntd
      theme="light"
      mode="inline"
      css={menuStyle}
      items={items}
      defaultSelectedKeys={['kpi']}
      defaultOpenKeys={['sales']}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onClick={handleMenuItemClick}
      onOpenChange={onOpenMenuItemChange}
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
