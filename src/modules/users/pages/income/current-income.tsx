import { TableCustom } from '@/components/table';
import { currentIncomeColumns } from './column/current-income.column';
import { DataCurrentIncomeType } from './type.currentIncome';

const currentIcomeData: DataCurrentIncomeType[] = [
  {
    key: 1,
    incomePreTaxTotal: '1.000.000.000',
    incomeNonTaxTotal: '1.000.000.000',
    deductionForFamilyCircumstances: '1.000.000',
    socialInsurancePaidByEmployee: '1.000.000.000',
    taxableIncome: '1.000.000.000',
    personalIncomeTaxTemporarilyCollected: '1.000.000.000',
    incomeReceived: '1.000.000.000',
  },
];

export default function CurrentIncomeTable() {
  return (
    <TableCustom
      columns={currentIncomeColumns}
      dataSource={currentIcomeData}
      loading={false}
      rowKey={(record) => record.key}
      pagination={{ current: 1, pageSize: 7 }}
      scroll={{ x: 1450 }}
    />
  );
}
