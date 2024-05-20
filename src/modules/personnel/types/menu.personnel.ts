import { MenuItem } from '@/types/menu';
export const personnelMenus: MenuItem = {
  code: 'personnel',
  icon: 'user-group',
  label: {
    vi_VN: 'Nhân sự',
    en_US: 'Personnel',
  },
  children: [
    {
      code: 'inforPersonnel',
      icon: 'dot',
      path: '/personnel/infor-personnel',
      label: {
        vi_VN: 'Thông tin nhân sự',
        en_US: 'Personnel information ',
      },
    },
    {
      code: 'inforIncome',
      icon: 'dot',
      path: '/personnel/infor-income',
      label: {
        vi_VN: 'Thông tin thu nhập',
        en_US: 'Income information',
      },
    },
    {
      code: 'inforOrganizational ',
      icon: 'dot',
      path: '/personnel/infor-organizational',
      label: {
        vi_VN: 'Thông tin tổ chức',
        en_US: 'Organizational information',
      },
    },
    {
      code: 'inforOther',
      icon: 'dot',
      path: '/personnel/infor-other',
      label: {
        vi_VN: 'Thông tin khác',
        en_US: 'Other information',
      },
    },
  ],
};
