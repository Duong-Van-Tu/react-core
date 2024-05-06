import type { GetProp, MenuProps } from 'antd';
import { PayrollIcon } from '@/components/icons';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const payrollMenus: MenuItem[] = [
  {
    key: 'payroll',
    icon: <PayrollIcon color="#333" width={20} height={20} />,
    label: 'Payroll',
  },
];
