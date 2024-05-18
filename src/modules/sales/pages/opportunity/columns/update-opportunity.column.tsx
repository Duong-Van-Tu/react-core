import { TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];
export const updateOpportunityColumns: ColumnsType<any> = [
  {
    title: 'Mục tiêu',
    dataIndex: 'target',
    render: (target) => target,
  },
  {
    title: 'Hoạt động',
    dataIndex: 'activites',
    render: (activites) => activites,
  },
  {
    title: 'Thời điểm',
    dataIndex: 'time',
    render: (time) => time,
  },
  {
    title: 'Kết quả',
    dataIndex: 'result',
    render: (result) => result,
  },
  {
    title: '',
    fixed: 'right',
    width: '1%',
    render: () => '',
  },
];
