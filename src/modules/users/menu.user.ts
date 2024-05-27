import { MenuItem } from '@/types/menu';
export const menuUsers: MenuItem = {
  code: 'users',
  icon: 'user-group',
  label: {
    vi_VN: 'Nhân sự',
    en_US: 'Users',
  },
  children: [
    {
      code: 'human-resources',
      icon: 'dot',
      path: '/users/human-resources',
      label: {
        vi_VN: 'Thông tin nhân sự',
        en_US: 'Users information ',
      },
    },
    {
      code: 'income',
      icon: 'dot',
      path: '/users/income',
      label: {
        vi_VN: 'Thông tin thu nhập',
        en_US: 'Income information',
      },
    },
    {
      code: 'organizational ',
      icon: 'dot',
      path: '/users/organize',
      label: {
        vi_VN: 'Thông tin tổ chức',
        en_US: 'Organizational information',
      },
    },
    {
      code: 'other',
      icon: 'dot',
      path: '/users/other',
      label: {
        vi_VN: 'Thông tin khác',
        en_US: 'Other information',
      },
    },
  ],
};
