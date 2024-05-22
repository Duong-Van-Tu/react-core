import { LocaleFormatter } from '@/components/locale-formatter';
import { TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];

export const usersColumns: ColumnsType<DataUserType> = [
  {
    title: <LocaleFormatter id="title.column.humanResources.fullName" />,
    dataIndex: 'fullName',
    render: (fullName) => fullName,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.position" />,
    dataIndex: 'location',
    render: (location) => location,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.dob" />,
    dataIndex: 'dateBirth',
    render: (dateBirth) => dateBirth,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.address" />,
    dataIndex: 'address',
    render: (address) => address,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (email) => email,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.numberPhone" />,
    dataIndex: 'phone',
    render: (phone) => phone,
  },
];
