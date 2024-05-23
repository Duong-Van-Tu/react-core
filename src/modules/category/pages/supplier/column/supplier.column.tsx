import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';

import { SupplierDropdown } from '@/modules/category/components/dropdown/supplier.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const supplierColumns: ColumnsType<DataSupplierType> = [
  {
    title: <LocaleFormatter id="table.column.supplierCode" />,
    dataIndex: 'code',
    render: (code) => code,
  },

  {
    title: <LocaleFormatter id="table.column.supplierFullName" />,
    dataIndex: 'name',
    render: (name) => name,
  },

  {
    title: <LocaleFormatter id="table.column.supplierDesc" />,
    dataIndex: 'description',
    render: (description) => description,
  },

  {
    title: <LocaleFormatter id="table.column.supplierReview" />,
    dataIndex: 'review',
    render: (review) => review,
  },

  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <SupplierDropdown data={record} />,
  },
];
