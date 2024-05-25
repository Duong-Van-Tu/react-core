import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { ServiceDropdown } from '@/modules/category/components/dropdown/service.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const serviceColumns: ColumnsType<DataServiceCategoryType> = [
  {
    title: <LocaleFormatter id="table.column.serviceCode" />,
    dataIndex: 'code',
    render: (code) => code,
  },

  {
    title: <LocaleFormatter id="table.column.serviceName" />,
    dataIndex: 'name',
    render: (name) => name,
  },

  {
    title: <LocaleFormatter id="table.column.serviceShortName" />,
    dataIndex: 'shortName',
    render: (shortName) => shortName,
  },

  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <ServiceDropdown data={record} />,
  },
];
