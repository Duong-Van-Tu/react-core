import { DataInforPersonnelType } from '@/modules/personnel/pages/inforPersonnel/type.inforPersonnel';
import { TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];

export const inforPersonnelColumns: ColumnsType<DataInforPersonnelType> = [
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    render: (fullName) => fullName,
  },
  {
    title: 'Vị trí',
    dataIndex: 'location',
    render: (location) => location,
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'dateBirth',
    render: (dateBirth) => dateBirth,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    render: (address) => address,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (email) => email,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    render: (phone) => phone,
  },
];
