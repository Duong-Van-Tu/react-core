import type { GetProp, MenuProps } from 'antd';
import { ReportIcon } from '@/components/icons';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const reportMenus: MenuItem[] = [
  {
    key: 'reports',
    icon: <ReportIcon color="#333" width={20} height={20} />,
    label: 'Reports',
  },
];
