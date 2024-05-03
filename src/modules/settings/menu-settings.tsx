import type { GetProp, MenuProps } from 'antd';
import { UsersIcon } from '../../components/icons';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const settingMenus: MenuItem[] = [
  {
    key: 'settings',
    icon: <UsersIcon color="#333" width={20} height={20} />,
    label: 'Settings',
  },
];
