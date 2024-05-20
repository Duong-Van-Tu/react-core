import { TableCustom } from '@/components/table';
import { locationIncomeColumns } from './column/location-income.column';
import { DataLocationIncomeType } from './type.locationIncome';

const locationIcomeData: DataLocationIncomeType[] = [
  {
    key: 1,
    month: 'Tháng 1',
    oneLocation: '1.000.000.000',
    twoLocation: '1.000.000.000',
    threeLocation: '-',
    fourLocation: '-',
    fiveLocation: '-',
    incomeOther: '-',
    incomeTotal: '2.000.000.000',
  },
];

export default function LocationIncomeTable() {
  return (
    <TableCustom
      columns={locationIncomeColumns}
      dataSource={locationIcomeData}
      loading={false}
      rowKey={(record) => record.key}
      pagination={{ current: 1, pageSize: 7 }}
      scroll={{ x: 1450 }}
    />
  );
}
