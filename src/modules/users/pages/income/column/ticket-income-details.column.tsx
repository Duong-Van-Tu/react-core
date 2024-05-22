import { LocaleFormatter } from '@/components/locale-formatter';
import { TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];

export const ticketIncomeDetailsColumns: ColumnsType<any> = [
  {
    title: <LocaleFormatter id="title.column.income.content" />,
    dataIndex: 'content',
    render: (content) => content,
  },
  {
    title: <LocaleFormatter id="title.column.income.expectedAmount" />,
    dataIndex: 'expectedAmount',
    render: (expectedAmount) => expectedAmount,
  },
  {
    title: <LocaleFormatter id="title.column.income.actualAmountSpent" />,
    dataIndex: 'actualAmount',
    render: (actualAmount) => actualAmount,
  },
  {
    title: <LocaleFormatter id="title.column.income.object" />,
    dataIndex: 'object',
    render: (object) => object,
  },
  {
    title: <LocaleFormatter id="title.column.income.type" />,
    dataIndex: 'CPType',
    render: (CPType) => CPType,
  },
  {
    title: <LocaleFormatter id="title.column.income.projectName" />,
    dataIndex: 'projectName',
    render: (projectName) => projectName,
  },
  {
    title: <LocaleFormatter id="title.column.income.timeSpent" />,
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
