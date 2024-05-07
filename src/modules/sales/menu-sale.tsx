import type { MenuProps } from 'antd';
import { DotIcon, UserGroupIcon } from '@/components/icons';

type MenuItem = Required<MenuProps>['items'][number];

export const saleMenus: MenuItem[] = [
  {
    key: 'sales',
    icon: <UserGroupIcon color="#333" width={20} height={20} />,
    label: 'Sale ',
    children: [
      {
        key: 'kpi',
        icon: <DotIcon width={16} height={16} />,
        label: 'KPI',
      },
      {
        key: 'privileges',
        icon: <DotIcon width={16} height={16} />,
        label: 'Quyền lợi',
      },
      {
        key: 'relationship',
        icon: <DotIcon width={16} height={16} />,
        label: 'Mối quan hệ',
      },
      {
        key: 'opportunity',
        icon: <DotIcon width={16} height={16} />,
        label: 'Cơ hội',
      },
      {
        key: 'sale-kit',
        icon: <DotIcon width={16} height={16} />,
        label: 'Sale kit',
      },
    ],
  },
];
