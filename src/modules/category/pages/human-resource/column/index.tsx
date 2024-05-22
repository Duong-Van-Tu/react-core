import { LocaleFormatter } from '@/components/locale-formatter';
import { UserCategoryDropdown } from '@/modules/category/components/dropdown/human-resource.dropdown';
import { TableProps } from 'antd';
import dayjs from 'dayjs';

type ColumnsType<T> = TableProps<T>['columns'];

export const usersColumns: ColumnsType<DataUserType> = [
  {
    title: <LocaleFormatter id="title.column.humanResources.humanResourceCode" />,
    dataIndex: 'code',
    render: (code) => code,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.humanResourceName" />,
    dataIndex: 'fullName',
    render: (fullName) => fullName,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.title" />,
    dataIndex: ['applicationRoles'],
    render: (roles: ApplicationRolesType[]) => (
      <>
        {roles?.map((role, index) => (
          <div key={index}>
            {role.displayName}
            {index < roles.length - 1 && <br />}
          </div>
        ))}
      </>
    ),
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.startDate" />,
    dataIndex: 'startDate',
    render: (__, record) => {
      return `${dayjs(record.startDate).format('DD/MM/YYYY')} `;
    },
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.endDate" />,
    dataIndex: 'endDate',
    render: (__, record) => {
      return `${dayjs(record.endDate).format('DD/MM/YYYY')} `;
    },
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
    dataIndex: 'review',
    render: (review) => review,
  },
  {
    title: <LocaleFormatter id="title.column.humanResources.note" />,
    dataIndex: 'notes',
    render: (notes) => notes,
  },
  {
    title: '',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <UserCategoryDropdown data={record} />,
  },
];
