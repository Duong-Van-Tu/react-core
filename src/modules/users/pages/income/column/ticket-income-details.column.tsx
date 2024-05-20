import { TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];
export const ticketIncomeDetailsColumns: ColumnsType<any> = [
  {
    title: 'Nội dung',
    dataIndex: 'content',
    render: (content) => content,
  },
  {
    title: 'Số tiền dự kiến',
    dataIndex: 'expectedAmount',
    render: (expectedAmount) => expectedAmount,
  },
  {
    title: 'Số tiền thực chi',
    dataIndex: 'actualAmount',
    render: (actualAmount) => actualAmount,
  },
  {
    title: 'Đối tượng',
    dataIndex: 'object',
    render: (object) => object,
  },
  {
    title: 'Loại CP',
    dataIndex: 'CPType',
    render: (CPType) => CPType,
  },
  {
    title: 'Project Name',
    dataIndex: 'projectName',
    render: (projectName) => projectName,
  },
  {
    title: 'Thời điểm chi',
    dataIndex: 'spentTime',
    render: (spentTime) => spentTime,
  },
  {
    title: '',
    fixed: 'right',
    width: '5%',
    render: () => '',
  },
];
