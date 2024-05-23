import { TableProps } from 'antd';
import dayjs from 'dayjs';

type ColumnsType<T> = TableProps<T>['columns'];
export const historyOpportunityColumns: ColumnsType<HistoryOpportunityType> = [
  {
    title: 'Người cập nhật',
    dataIndex: 'applicationUser',
    width: '14%',
  },
  {
    title: 'Mục tiêu',
    dataIndex: 'goal',
    width: '14%',
  },
  {
    title: 'Hoạt động',
    dataIndex: 'activity',
  },
  {
    title: 'Thời điểm',
    dataIndex: 'time',
    render: (value) => dayjs(value).format('DD/MM/YYYY'),
  },
  {
    title: 'Kết quả',
    dataIndex: 'result',
  },
];
