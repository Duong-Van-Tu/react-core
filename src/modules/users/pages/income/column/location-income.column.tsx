import { TableProps } from 'antd';
import { Link } from 'react-router-dom';

import { DataLocationIncomeType } from '../type.locationIncome';
import { LocaleFormatter } from '@/components/locale-formatter';
type ColumnsType<T> = TableProps<T>['columns'];
export const locationIncomeColumns: ColumnsType<DataLocationIncomeType> = [
  {
    title: <LocaleFormatter id="title.month" />,
    dataIndex: 'month',
    render: (month) => month,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position1" />,
    dataIndex: 'oneLocation',
    render: (oneLocation) => oneLocation,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position2" />,
    dataIndex: 'twoLocation',
    render: (twoLocation) => twoLocation,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position3" />,
    dataIndex: 'threeLocation',
    render: (threeLocation) => threeLocation,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position4" />,
    dataIndex: 'fourLocation',
    render: (fourLocation) => fourLocation,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.position5" />,
    dataIndex: 'fiveLocation',
    render: (fiveLocation) => fiveLocation,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.otherIncome" />,
    dataIndex: 'incomeOther',
    render: (incomeOther) => incomeOther,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeReceived" />,
    dataIndex: 'incomeTotal',
    render: (incomeTotal) => incomeTotal,
  },
  {
    title: '',
    dataIndex: 'detailsView',
    fixed: 'right',
    width: '7%',
    render: () => (
      <Link to="/personnel/infor-income/details-view">
        <LocaleFormatter id="title.document.detailsView" />
      </Link>
    ),
  },
];
