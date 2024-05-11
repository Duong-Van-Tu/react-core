import { TableCustom } from '@/components/table';
import { myKPIColumns } from './columns/my-kpi.column';
import { DataKPIType } from './type.kpi';

const myData: DataKPIType[] = [
  {
    key: 1,
    proposer: 'proposer1',
    criteria: 'criteria1',
    objective: 'objective1',
    reality: 'reality1',
    targetPoint: 'targetPoint1',
    implementationTime: 'implementationTime1',
    calculationMethod: 'calculationMethod1',
  },
];

export default function MyKPITable() {
  return (
    <TableCustom
      columns={myKPIColumns}
      dataSource={myData}
      loading={false}
      rowKey={(record) => record.key}
      pagination={{ current: 1, pageSize: 7 }}
      scroll={{ x: 1450 }}
    />
  );
}
