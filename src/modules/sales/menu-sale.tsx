import type { MenuProps } from 'antd';
import { DotIcon, UsersIcon } from '../../components/icons';

type MenuItem = Required<MenuProps>['items'][number];

export const saleMenus: MenuItem[] = [
  {
    key: 'sales',
    icon: <UsersIcon color="#333" width={20} height={20} />,
    label: 'Sale Sale Sale Sale Sale Sale Sale',
    children: [
      {
        key: 'kpi',
        icon: <DotIcon width={14} height={14} />,
        label: 'KPI',
      },
      {
        key: 'privileges',
        icon: <DotIcon width={14} height={14} />,
        label: 'Quyền lợi',
      },
    ],
  },
];
