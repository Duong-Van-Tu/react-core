import { TableCustom } from '@/components/table';
import { myPrivilegesColumns } from './columns/my-privileges.column';
import { DataPrivilegesType } from './type.privileges';

const myData: DataPrivilegesType[] = [
  {
    key: 1,
    beneficiaryName: 'beneficiaryName',
    fixedMonthlySalary: 'fixedMonthlySalary',
    totalTargetVariableSalary: 'totalTargetVariableSalary',
    actualVariableSalary: 'actualVariableSalary',
    status: 'status',
  },
];

export default function MyPrivilegesTable() {
  return (
    <TableCustom
      columns={myPrivilegesColumns}
      dataSource={myData}
      loading={false}
      rowKey={(record) => record.key}
      pagination={{ current: 1, pageSize: 7 }}
      scroll={{ x: 1450 }}
    />
  );
}
