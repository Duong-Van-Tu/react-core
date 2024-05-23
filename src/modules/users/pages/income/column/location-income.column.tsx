import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import ViewDetail from '../components/view.detail';

type ColumnsType<T> = TableProps<T>['columns'];
export const locationIncomeColumnsUser: ColumnsType<DataIncomTypeWithRoleUserType> = [
  {
    title: <LocaleFormatter id="title.month" />,
    dataIndex: 'month',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position1" />,
    dataIndex: 'oneLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[0]?.income ? record?.incomeRoles[0]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position2" />,
    dataIndex: 'twoLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[1]?.income ? record?.incomeRoles[1]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position3" />,
    dataIndex: 'threeLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[2]?.income ? record?.incomeRoles[2]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position4" />,
    dataIndex: 'fourLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[3]?.income ? record?.incomeRoles[3]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position5" />,
    dataIndex: 'fiveLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[4]?.income ? record?.incomeRoles[4]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.otherIncome" />,
    dataIndex: 'incomeOther',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeReceived" />,
    dataIndex: 'totalIncome',
  },
  {
    title: '',
    dataIndex: 'detailsView',
    fixed: 'right',
    width: '10%',
    render: (_, record) => <ViewDetail recordUser={record} />,
  },
];

export const locationIncomeColumnsAdmin: ColumnsType<DataIncomTypeWithRoleAdminType> = [
  {
    title: <LocaleFormatter id="title.column.income.humanResourceCode" />,
    dataIndex: ['applicationUser', 'id'],
  },
  {
    title: <LocaleFormatter id="title.column.income.fullName" />,
    dataIndex: ['applicationUser', 'fullName'],
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position1" />,
    dataIndex: 'oneLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[0]?.income ? record?.incomeRoles[0]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position2" />,
    dataIndex: 'twoLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[1]?.income ? record?.incomeRoles[1]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position3" />,
    dataIndex: 'threeLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[2]?.income ? record?.incomeRoles[2]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position4" />,
    dataIndex: 'fourLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[3]?.income ? record?.incomeRoles[3]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position5" />,
    dataIndex: 'fiveLocation',
    render: (_, record) => {
      return <>{record?.incomeRoles[4]?.income ? record?.incomeRoles[4]?.income : '-'}</>;
    },
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.otherIncome" />,
    dataIndex: 'incomeOther',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeReceived" />,
    dataIndex: 'totalIncome',
  },
  {
    title: '',
    dataIndex: 'detailsView',
    fixed: 'right',
    width: '10%',
    render: (_, record) => <ViewDetail recordAdmin={record} />,
  },
];
