import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { RelationshipDropdown } from '@/modules/sales/components/dropdown/relationship.dropdown';
import { DataRelationshipType } from '../type.relationship';

type ColumnsType<T> = TableProps<T>['columns'];
export const myRelationshipColumns: ColumnsType<DataRelationshipType> = [
  {
    title: <LocaleFormatter id="table.column.relationship.jobPosition" />,
    dataIndex: 'jobPosition',
    render: (jobPosition) => jobPosition,
  },
  {
    title: <LocaleFormatter id="table.column.relationship.targetLevel" />,
    dataIndex: 'targetLevel',
    render: (targetLevel) => targetLevel,
  },
  {
    title: <LocaleFormatter id="table.column.relationship.upgrade" />,
    dataIndex: 'upgrade',
    render: (upgrade) => upgrade,
  },
  {
    title: <LocaleFormatter id="table.column.relationship.responsiblePerson" />,
    dataIndex: 'responsiblePerson',
    render: (responsiblePerson) => responsiblePerson,
  },

  {
    title: <LocaleFormatter id="table.column.targetPoint" />,
    dataIndex: 'targetPoint',
    render: (targetPoint) => targetPoint,
  },
  {
    title: <LocaleFormatter id="table.column.status" />,
    dataIndex: 'status',
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
