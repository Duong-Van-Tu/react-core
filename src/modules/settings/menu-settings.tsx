import type { GetProp, MenuProps } from 'antd';
import { SettingIcon } from '@/components/icons';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const settingMenus: MenuItem[] = [
  {
    key: 'settings',
    icon: <SettingIcon color="#333" width={20} height={20} />,
    label: 'Settings',
  },
];
