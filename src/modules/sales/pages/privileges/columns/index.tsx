import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { PrivilegesDropdown } from '@/modules/sales/components/dropdown/privileges.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const columnsEmployee: ColumnsType<DataBenefitType> = [
  {
    title: <LocaleFormatter id="table.column.privileges.beneficiaryName" />,
    dataIndex: ['applicationUser', 'fullName'],
  },
  {
    title: 'Tổng quyền lợi hiện tại',
    dataIndex: 'totalBenefit',
  },
  {
    title: <LocaleFormatter id="table.column.privileges.fixedMonthlySalary" />,
    dataIndex: 'monthlySalary',
  },
  {
    title: <LocaleFormatter id="table.column.privileges.totalTargetVariableSalary" />,
    dataIndex: 'targetSalary',
  },
  {
    title: <LocaleFormatter id="table.column.privileges.totalSalary" />,
    dataIndex: 'totalSalary',
  },
  {
    title: <LocaleFormatter id="table.column.status" />,
    dataIndex: ['benefitStatus', 'name'],
    render: (status) => status,
  },
  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <PrivilegesDropdown data={record} />,
  },
];

export const columnsManager: ColumnsType<DataBenefitType> = [
  {
    title: 'Tổng quyền lợi hiện tại',
    dataIndex: 'totalBenefit',
  },
  {
    title: 'Tổng mức lương mục tiêu',
    dataIndex: 'targetSalary',
  },
  {
    title: 'Mức lương cố định hàng tháng',
    dataIndex: 'monthlySalary',
  },
  {
    title: <LocaleFormatter id="table.column.privileges.totalSalary" />,
    dataIndex: 'totalSalary',
  },
];
