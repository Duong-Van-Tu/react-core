import { Link } from 'react-router-dom';
import { UsersIcon } from '../../components/icons';
import type { GetProp, MenuProps } from 'antd';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const settingMenus: MenuItem[] = [
  {
    key: 'settings',
    icon: <UsersIcon color="#333" width={20} height={20} />,
    label: <Link to="/settings">Settings</Link>,
  },
];
