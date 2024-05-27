import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { CustomerDropdown } from '@/modules/category/components/dropdown/customer.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const customerColumns: ColumnsType<DataCustomerType> = [
  {
    title: <LocaleFormatter id="table.column.customersID" />,
    dataIndex: 'code',
    render: (code) => code,
  },
  {
    title: <LocaleFormatter id="table.column.customersName" />,
    dataIndex: 'fullname',
    render: (fullname) => fullname,
  },

  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <CustomerDropdown data={record} />,
  },
];
