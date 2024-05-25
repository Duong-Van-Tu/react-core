import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import dayjs from 'dayjs';
import { ContractDropdown } from '@/modules/category/components/dropdown/contract.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const contractColumns: ColumnsType<DataContractType> = [
  {
    title: <LocaleFormatter id="table.column.contractID" />,
    dataIndex: 'code',
    render: (code) => code,
  },

  {
    title: <LocaleFormatter id="table.column.contractNumber" />,
    dataIndex: 'number',
    render: (number) => number,
  },

  {
    title: <LocaleFormatter id="table.column.contractName" />,
    dataIndex: 'name',
    render: (name) => name,
  },

  {
    title: <LocaleFormatter id="table.column.contractStartDate" />,
    dataIndex: 'startDate',
    render: (__, record) => {
      return `${dayjs(record.startDate).format('DD/MM/YYYY')} `;
    },
  },

  {
    title: <LocaleFormatter id="table.column.contractEndDate" />,
    dataIndex: 'endDate',
    render: (__, record) => {
      return `${dayjs(record.endDate).format('DD/MM/YYYY')} `;
    },
  },

  {
    title: <LocaleFormatter id="table.column.contractCustomerID" />,
    dataIndex: ['customer'],
    render: (customer: Customer) => customer?.code,
  },

  {
    title: <LocaleFormatter id="table.column.contractStatus" />,
    dataIndex: ['contractStatus'],
    render: (status: ContractStatus) => status.name,
  },

  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <ContractDropdown data={record} />,
  },
];
