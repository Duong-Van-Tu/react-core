import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { KPIDropdown } from '@/modules/sales/components/dropdown/kpi.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const employeeKPIColumns: ColumnsType<DataKPIType> = [
  {
    title: <LocaleFormatter id="table.column.kpi.proposer" />,
    dataIndex: 'proposer',
    render: (proposer) => proposer,
  },
  {
    title: <LocaleFormatter id="table.column.kpi.criteria" />,
    dataIndex: 'criteria',
    render: (criteria) => criteria,
  },
  {
    title: <LocaleFormatter id="table.column.kpi.objective" />,
    dataIndex: 'objective',
    render: (objective) => objective,
  },
  {
    title: <LocaleFormatter id="table.column.targetPoint" />,
    dataIndex: 'targetPoint',
    render: (targetPoint) => targetPoint,
  },
  {
    title: <LocaleFormatter id="table.column.kpi.implementationTime" />,
    dataIndex: 'implementationTime',
    render: (implementationTime) => implementationTime,
  },
  {
    title: <LocaleFormatter id="table.column.kpi.calculationMethod" />,
    dataIndex: 'calculationMethod',
    render: (calculationMethod) => calculationMethod,
  },
  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: () => <KPIDropdown />,
  },
];
