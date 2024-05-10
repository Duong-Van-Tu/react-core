import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { PrivilegesDropdown } from '@/modules/sales/components/dropdown/privileges.dropdown';
import { DataPrivilegesType } from '../type.privileges';

type ColumnsType<T> = TableProps<T>['columns'];
export const myPrivilegesColumns: ColumnsType<DataPrivilegesType> = [
  {
    title: <LocaleFormatter id="table.column.privileges.beneficiaryName" />,
    dataIndex: 'beneficiaryName',
    render: (beneficiaryName) => beneficiaryName,
  },
  {
    title: <LocaleFormatter id="table.column.privileges.fixedMonthlySalary" />,
    dataIndex: 'fixedMonthlySalary',
    render: (fixedMonthlySalary) => fixedMonthlySalary,
  },
  {
    title: <LocaleFormatter id="table.column.privileges.totalTargetVariableSalary" />,
    dataIndex: 'totalTargetVariableSalary',
    render: (totalTargetVariableSalary) => totalTargetVariableSalary,
  },
  {
    title: <LocaleFormatter id="table.column.privileges.actualVariableSalary" />,
    dataIndex: 'actualVariableSalary',
    render: (actualVariableSalary) => actualVariableSalary,
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
    render: () => <PrivilegesDropdown />,
  },
];
