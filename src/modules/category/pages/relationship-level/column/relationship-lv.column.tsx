import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { RelationshipLvDropdown } from '@/modules/category/components/dropdown/relationship-lv.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const relationshipLvColumns: ColumnsType<DataReationshipLevelType> = [
  {
    title: <LocaleFormatter id="table.column.relationshipLvCode" />,
    dataIndex: 'code',
    render: (code) => code,
  },

  {
    title: <LocaleFormatter id="table.column.relationshipLvDesc" />,
    dataIndex: 'description',
    render: (description) => description,
  },

  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <RelationshipLvDropdown data={record} />,
  },
];
