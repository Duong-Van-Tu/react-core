import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { RelationshipDropdown } from '@/modules/sales/components/dropdown/relationship.dropdown';
import { DataRelationshipType } from '../type.relationship';

type ColumnsType<T> = TableProps<T>['columns'];
const columns: ColumnsType<DataRelationshipType> = [
  {
    title: <LocaleFormatter id="table.column.relationship.jobPosition" />,
    dataIndex: 'position',
  },
  {
    title: <LocaleFormatter id="table.column.relationship.targetLevel" />,
    dataIndex: 'targetRelationshipLevel',
  },
  {
    title: <LocaleFormatter id="table.column.relationship.upgrade" />,
    dataIndex: 'reason',
  },
  {
    title: <LocaleFormatter id="table.column.relationship.responsiblePerson" />,
    dataIndex: ['applicationUser', 'firstName'],
  },

  {
    title: <LocaleFormatter id="table.column.targetPoint" />,
    dataIndex: 'point',
    render: (targetPoint) => targetPoint,
  },
  {
    title: <LocaleFormatter id="table.column.status" />,
    dataIndex: ['relationshipStatus', 'name'],
    render: (status) => status,
  },
  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: () => <RelationshipDropdown />,
  },
];

export default columns;
