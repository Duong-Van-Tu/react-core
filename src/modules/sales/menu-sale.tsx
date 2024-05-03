import { Link } from 'react-router-dom';
import { DotIcon, UsersIcon } from '../../components/icons';
import type { GetProp, MenuProps } from 'antd';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const saleMenus: MenuItem[] = [
  {
    key: 'sales',
    icon: <UsersIcon color="#333" width={20} height={20} />,
    label: 'Sale',
    children: [
      {
        key: 'kpi',
        icon: <DotIcon width={14} height={14} />,
        label: <Link to="/sales/kpi">KPI</Link>,
      },
      {
        key: 'privileges',
        icon: <DotIcon width={14} height={14} />,
        label: <Link to="/sales/privileges">Quyền lợi</Link>,
      },
    ],
  },
];
