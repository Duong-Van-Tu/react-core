import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { PrivilegesDropdown } from '@/modules/sales/components/dropdown/privileges.dropdown';
import { StatusBenefit } from '@/modules/sales/enum/status.enum';
import { Message } from '@/components/message';
import { currencyFormatter } from '@/utils/formatter';

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
    render: (value) => currencyFormatter(value),
  },
  {
    title: <LocaleFormatter id="table.column.privileges.totalTargetVariableSalary" />,
    dataIndex: 'targetSalary',
    render: (value) => currencyFormatter(value),
  },
  {
    title: <LocaleFormatter id="table.column.privileges.totalSalary" />,
    dataIndex: 'totalSalary',
    render: (value) => currencyFormatter(value),
  },
  {
    title: <LocaleFormatter id="table.column.status" />,
    dataIndex: ['benefitStatus', 'name'],
    align: 'center',
    render: (__, record) => {
      let messageType: MessageType;
      switch (record.benefitStatus?.code) {
        case StatusBenefit.Updated:
          messageType = 'success';
          break;
        case StatusBenefit.Request:
        case StatusBenefit.Confirm:
          messageType = 'info';
          break;
        default:
          messageType = 'warning';
      }
      return record.benefitStatus ? (
        <Message hasBackground type={messageType}>
          {record.benefitStatus.name!}
        </Message>
      ) : (
        ''
      );
    },
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
    render: (value) => currencyFormatter(value),
  },
  {
    title: 'Mức lương cố định hàng tháng',
    dataIndex: 'monthlySalary',
    render: (value) => currencyFormatter(value),
  },
  {
    title: <LocaleFormatter id="table.column.privileges.totalSalary" />,
    dataIndex: 'totalSalary',
    render: (value) => currencyFormatter(value),
  },
];
