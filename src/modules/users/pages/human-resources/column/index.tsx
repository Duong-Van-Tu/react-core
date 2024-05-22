import { LocaleFormatter } from '@/components/locale-formatter';
import { TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];

export const usersColumns: ColumnsType<DataUserType> = [
  {
<<<<<<< HEAD
    title: <LocaleFormatter id="title.column.humanResources.fullName" />,
=======
    title: <LocaleFormatter id="title.myRelationships.proposedReport.fullName" />,
>>>>>>> develop
    dataIndex: 'fullName',
    render: (fullName) => fullName,
  },
  {
<<<<<<< HEAD
    title: <LocaleFormatter id="title.column.humanResources.position" />,
=======
    title: <LocaleFormatter id="title.myRelationships.proposedReport.position" />,
>>>>>>> develop
    dataIndex: 'location',
    render: (location) => location,
  },
  {
<<<<<<< HEAD
    title: <LocaleFormatter id="title.column.humanResources.dob" />,
=======
    title: <LocaleFormatter id="title.myRelationships.proposedReport.dob" />,
>>>>>>> develop
    dataIndex: 'dateBirth',
    render: (dateBirth) => dateBirth,
  },
  {
<<<<<<< HEAD
    title: <LocaleFormatter id="title.column.humanResources.address" />,
=======
    title: <LocaleFormatter id="title.myRelationships.proposedReport.address" />,
>>>>>>> develop
    dataIndex: 'address',
    render: (address) => address,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (email) => email,
  },
  {
<<<<<<< HEAD
    title: <LocaleFormatter id="title.column.humanResources.numberPhone" />,
=======
    title: <LocaleFormatter id="title.myRelationships.proposedReport.numberPhone" />,
>>>>>>> develop
    dataIndex: 'phone',
    render: (phone) => phone,
  },
];
