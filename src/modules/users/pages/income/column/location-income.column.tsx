import { TableProps } from 'antd';
import { Link } from 'react-router-dom';

import { DataLocationIncomeType } from '../type.locationIncome';
type ColumnsType<T> = TableProps<T>['columns'];

export const locationIncomeColumns: ColumnsType<DataLocationIncomeType> = [
  {
    title: 'Tháng',
    dataIndex: 'month',
    render: (month) => month,
  },
  {
    title: 'Vị trí 1',
    dataIndex: 'oneLocation',
    render: (oneLocation) => oneLocation,
  },
  {
    title: 'Vị trí 2',
    dataIndex: 'twoLocation',
    render: (twoLocation) => twoLocation,
  },
  {
    title: 'Vị trí 3',
    dataIndex: 'threeLocation',
    render: (threeLocation) => threeLocation,
  },
  {
    title: 'Vị trí 4',
    dataIndex: 'fourLocation',
    render: (fourLocation) => fourLocation,
  },
  {
    title: 'Vị trí 5',
    dataIndex: 'fiveLocation',
    render: (fiveLocation) => fiveLocation,
  },
  {
    title: 'Các khoản thu nhập khác',
    dataIndex: 'incomeOther',
    render: (incomeOther) => incomeOther,
  },
  {
    title: 'Tổng thu nhập nhận được',
    dataIndex: 'incomeTotal',
    render: (incomeTotal) => incomeTotal,
  },
  {
    title: '',
    dataIndex: 'detailsView',
    fixed: 'right',
    width: '7%',
    render: () => <Link to="/personnel/infor-income/details-view">Xem chi tiết</Link>,
  },
];
