import { TableProps } from 'antd';
import { DataCurrentIncomeType } from '../type.currentIncome';
type ColumnsType<T> = TableProps<T>['columns'];

export const currentIncomeColumns: ColumnsType<DataCurrentIncomeType> = [
  {
    title: 'Tổng thu nhập trước thuế',
    dataIndex: 'incomePreTaxTotal',
    render: (incomePreTaxTotal) => incomePreTaxTotal,
  },
  {
    title: 'Tổng thu nhập không chịu thuế',
    dataIndex: 'incomeNonTaxTotal',
    render: (incomeNonTaxTotal) => incomeNonTaxTotal,
  },
  {
    title: 'Tổng giảm trừ gia cảnh',
    dataIndex: 'deductionForFamilyCircumstances',
    render: (deductionForFamilyCircumstances) => deductionForFamilyCircumstances,
  },
  {
    title: 'Tổng tiền BHXH NLD đóng',
    dataIndex: 'socialInsurancePaidByEmployee',
    render: (socialInsurancePaidByEmployee) => socialInsurancePaidByEmployee,
  },
  {
    title: 'Tổng thu nhập chịu thuế',
    dataIndex: 'taxableIncome',
    render: (taxableIncome) => taxableIncome,
  },
  {
    title: 'Tổng thuế TNCN tạm thu',
    dataIndex: 'personalIncomeTaxTemporarilyCollected',
    render: (personalIncomeTaxTemporarilyCollected) => personalIncomeTaxTemporarilyCollected,
  },
  {
    title: 'Tổng thu nhập nhận được',
    dataIndex: 'incomeReceived',
    render: (incomeReceived) => incomeReceived,
  },
];
