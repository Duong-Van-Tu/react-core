import { MenuItem } from '@/types/menu';
export const categoryMenus: MenuItem = {
  code: 'category',
  icon: 'user-group',
  label: {
    vi_VN: 'Danh mục',
    en_US: 'Category',
  },
  children: [
    {
      code: 'customer',
      icon: 'dot',
      path: '/category/customer',
      label: {
        vi_VN: 'Khách hàng',
        en_US: 'Customer',
      },
    },
    {
      code: 'human-resource',
      icon: 'dot',
      path: '/category/human-resource',
      label: {
        vi_VN: 'Nhân sự',
        en_US: 'Human resource',
      },
    },
    {
      code: 'supplier',
      icon: 'dot',
      path: '/category/supplier',
      label: {
        vi_VN: 'Nhà cung cấp',
        en_US: 'Supplier',
      },
    },
    {
      code: 'service',
      icon: 'dot',
      path: '/category/service',
      label: {
        vi_VN: 'Mảng dịch vụ',
        en_US: 'Service category',
      },
    },
    {
      code: 'relationship',
      icon: 'dot',
      path: '/category/relationship',
      label: {
        vi_VN: 'Mức độ quan hệ',
        en_US: 'Relationship level',
      },
    },
    {
      code: 'questions',
      icon: 'dot',
      path: '/category/questions',
      label: {
        vi_VN: 'Câu hỏi bằng GAINS',
        en_US: 'Questions using GAINS',
      },
    },
    {
      code: 'sale-kit',
      icon: 'dot',
      path: '/category/sale-kit',
      label: {
        vi_VN: 'Sale kit',
        en_US: 'Sale kit',
      },
    },
  ],
};
