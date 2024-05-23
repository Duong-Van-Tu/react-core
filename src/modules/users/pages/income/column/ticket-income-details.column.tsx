import { LocaleFormatter } from '@/components/locale-formatter';
import { TableProps } from 'antd';
import dayjs from 'dayjs';

type ColumnsType<T> = TableProps<T>['columns'];

export const ticketIncomeDetailsColumns: ColumnsType<any> = [
  {
    title: <LocaleFormatter id="title.column.income.content" />,
    dataIndex: 'note',
  },
  {
    title: <LocaleFormatter id="title.column.income.expectedAmount" />,
    dataIndex: 'incomeEta',
  },
  {
    title: <LocaleFormatter id="title.column.income.actualAmountSpent" />,
    dataIndex: 'incomeReal',
  },
  {
    title: <LocaleFormatter id="title.column.income.object" />,
    dataIndex: 'employeeCode',
  },
  {
    title: <LocaleFormatter id="title.column.income.type" />,
    dataIndex: 'typeCP',
  },
  {
    title: <LocaleFormatter id="title.column.income.projectName" />,
    dataIndex: 'projectName',
  },
  {
    title: <LocaleFormatter id="title.column.income.timeSpent" />,
    dataIndex: 'timeSpent',
    render: (timeSpent) => dayjs(timeSpent).format('DD/MM/YYYY, HH:mm:ss'),
  },
];
