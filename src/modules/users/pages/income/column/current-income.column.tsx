import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
type ColumnsType<T> = TableProps<T>['columns'];

export const currentIncomeColumns: ColumnsType<DataIncomeType> = [
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeBeforeTaxes" />,
    dataIndex: 'incomeBeforeTax',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeIsNotTaxable" />,
    dataIndex: 'incomeNonTax',
  },
  {
    title: (
      <LocaleFormatter id="table.column.currentIncome.totalDeductionDueToFamilyCircumstances" />
    ),
    dataIndex: 'dependent',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalSocialInsuranceAmount" />,
    dataIndex: 'insurance',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalTaxableIncome" />,
    dataIndex: 'incomeTax',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalTemporaryTaxCollected" />,
    dataIndex: 'personalIncomeTax',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeReceived" />,
    dataIndex: 'incomeRecevied',
  },
];

export const adminCurrentIncomeColumns: ColumnsType<DataIncomeType> = [
  {
    title: <LocaleFormatter id="title.column.income.humanResourceCode" />,
    dataIndex: ['applicationUser', 'id'],
  },
  {
    title: <LocaleFormatter id="title.column.income.fullName" />,
    dataIndex: ['applicationUser', 'fullName'],
  },
  {
    title: <LocaleFormatter id="title.column.income.position" />,
    dataIndex: 'roles',
    render: (roles: RoleType[]) => roles.map((role) => role.name).join(', '),
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeBeforeTaxes" />,
    dataIndex: 'incomeBeforeTax',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeIsNotTaxable" />,
    dataIndex: 'incomeNonTax',
  },
  {
    title: (
      <LocaleFormatter id="table.column.currentIncome.totalDeductionDueToFamilyCircumstances" />
    ),
    dataIndex: 'dependent',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalSocialInsuranceAmount" />,
    dataIndex: 'insurance',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalTaxableIncome" />,
    dataIndex: 'incomeTax',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalTemporaryTaxCollected" />,
    dataIndex: 'personalIncomeTax',
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeReceived" />,
    dataIndex: 'incomeRecevied',
  },
];
