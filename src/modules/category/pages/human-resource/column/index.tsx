import { LocaleFormatter } from '@/components/locale-formatter';
import { TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];

export const usersColumns: ColumnsType<DataUserType> = [
  {
    title: <LocaleFormatter id="title.column.humanResources.humanResourceCode" />,
    dataIndex: 'fullName',
    render: (fullName) => fullName,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.humanResourceName" />,
    dataIndex: 'location',
    render: (location) => location,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.title" />,
    dataIndex: 'dateBirth',
    render: (dateBirth) => dateBirth,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.startDate" />,
    dataIndex: 'address',
    render: (address) => address,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.endDate" />,
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
  {
    title: <LocaleFormatter id="title.column.humanResources.evaluate" />,
    dataIndex: 'phone',
    render: (phone) => phone,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.note" />,
    dataIndex: 'phone',
    render: (phone) => phone,
  },
  {
    title: '',
    fixed: 'right',
    width: '6%',
    render: () => <>Action</>,
  },
];
