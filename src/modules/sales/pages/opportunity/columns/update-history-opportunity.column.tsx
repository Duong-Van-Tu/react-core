import { SeeDetailsOpportunity } from '@/modules/sales/components/modals/opportuity/seeDetails-opportunity';
import { TableProps } from 'antd';
import { DataUpdateHistoryOpportunityType } from '../type.opportunity';

type ColumnsType<T> = TableProps<T>['columns'];
export const updateHistoryOpportunityColumns: ColumnsType<DataUpdateHistoryOpportunityType> = [
  {
    title: 'Thời gian cập nhật',
    dataIndex: 'updateTime',
    render: (updateTime) => updateTime,
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updatePerson',
    render: (updatePerson) => updatePerson,
  },
  {
    title: 'Mục tiêu',
    dataIndex: 'target',
    render: (target) => target,
  },
  {
    title: '',
    render: () => <SeeDetailsOpportunity />,
  },
  {
    title: '',
    fixed: 'right',
    width: '6%',
    render: () => '',
  },
];
