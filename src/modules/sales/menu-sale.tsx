import { MenuItem } from '@/types/menu';
export const saleMenus: MenuItem = {
  code: 'sales',
  icon: 'user-group',
  label: {
    vi_VN: 'Sale',
    en_US: 'Sale',
  },
  children: [
    {
      code: 'kpi',
      icon: 'dot',
      path: '/sales/kpi',
      label: {
        vi_VN: 'KPI',
        en_US: 'KPI',
      },
    },
    {
      code: 'privileges',
      icon: 'dot',
      path: '/sales/privileges',
      label: {
        vi_VN: 'Quyền lợi',
        en_US: 'Privileges',
      },
    },
    {
      code: 'relationship',
      icon: 'dot',
      path: '/sales/relationship',
      label: {
        vi_VN: 'Mối quan hệ',
        en_US: 'Relationship',
      },
    },
    {
      code: 'opportunity',
      icon: 'dot',
      path: '/sales/opportunity',
      label: {
        vi_VN: 'Cơ hội',
        en_US: 'Opportunity',
      },
    },
    {
      code: 'sale-kit',
      icon: 'dot',
      path: '/sales/sale-kit',
      label: {
        vi_VN: 'Sale kit',
        en_US: 'Sale Kit',
      },
    },
  ],
};
