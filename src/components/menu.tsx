/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Menu as MenuAntd } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { getFirstPathCode } from '@/utils/get-pathCode';
import { MenuItem } from '@/types/menu';
import { CustomIcon } from './icons';
import { useRootSelector } from '@/hooks/selector.hook';

type MenuProps = {
  items: MenuItem[];
};

export default function Menu({ items }: MenuProps) {
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(pathname);
  const [openKey, setOpenKey] = useState<string>();
  const language = useRootSelector((state) => state.locale.language);
  const navigate = useNavigate();
  const onMenuClick = (path: string) => {
    console.log('path: ', path);
    setSelectedKey(path);
    navigate(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    setOpenKey(key);
  };

  useEffect(() => {
    const firstPathCode = getFirstPathCode(pathname);
    // const lastPathCode = getLastPathCode(pathname);
    setSelectedKey(pathname);
    setOpenKey(firstPathCode);
  }, [pathname, setSelectedKey, setOpenKey]);

  return (
    <MenuAntd
      theme="light"
      mode="inline"
      css={menuStyle}
      items={
        items.map((item) =>
          item.children
            ? {
                key: item.code,
                icon: <CustomIcon type={item.icon || ''} width={20} height={20} />,
                label: item.label[language],
                children: item.children.map((child) => ({
                  key: child.path,
                  icon: <CustomIcon type={child.icon || ''} width={16} height={16} />,
                  label: child.label[language],
                })),
              }
            : {
                key: item.path,
                icon: <CustomIcon type={item.icon || ''} width={20} height={20} />,
                label: item.label[language],
                children: [],
              },
        ) as any
      }
      defaultOpenKeys={[getFirstPathCode(pathname)]}
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : undefined}
      onSelect={(k) => onMenuClick(k.key)}
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
  .ant-menu-submenu .ant-menu-submenu-title {
    svg path {
      fill: black;
    }
  }
  .ant-menu-submenu,
  .ant-menu-item span {
    font-weight: 600;
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
