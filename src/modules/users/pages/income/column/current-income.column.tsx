import { TableProps } from 'antd';
import { DataCurrentIncomeType } from '../type.currentIncome';
import { LocaleFormatter } from '@/components/locale-formatter';
type ColumnsType<T> = TableProps<T>['columns'];

export const currentIncomeColumns: ColumnsType<DataCurrentIncomeType> = [
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeBeforeTaxes" />,
    dataIndex: 'incomePreTaxTotal',
    render: (incomePreTaxTotal) => incomePreTaxTotal,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeIsNotTaxable" />,
    dataIndex: 'incomeNonTaxTotal',
    render: (incomeNonTaxTotal) => incomeNonTaxTotal,
  },
  {
    title: (
      <LocaleFormatter id="table.column.currentIncome.totalDeductionDueToFamilyCircumstances" />
    ),
    dataIndex: 'deductionForFamilyCircumstances',
    render: (deductionForFamilyCircumstances) => deductionForFamilyCircumstances,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalSocialInsuranceAmount" />,
    dataIndex: 'socialInsurancePaidByEmployee',
    render: (socialInsurancePaidByEmployee) => socialInsurancePaidByEmployee,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalTaxableIncome" />,
    dataIndex: 'taxableIncome',
    render: (taxableIncome) => taxableIncome,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalTemporaryTaxCollected" />,
    dataIndex: 'personalIncomeTaxTemporarilyCollected',
    render: (personalIncomeTaxTemporarilyCollected) => personalIncomeTaxTemporarilyCollected,
  },
  {
    title: <LocaleFormatter id="table.column.currentIncome.totalIncomeReceived" />,
    dataIndex: 'incomeReceived',
    render: (incomeReceived) => incomeReceived,
  },
];
