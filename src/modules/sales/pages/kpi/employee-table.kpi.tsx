import { TableCustom } from '@/components/table';
import { DataKPIType } from './type.kpi';
import { employeeKPIColumns } from './columns/employee-kpi.column';
import { Fragment } from 'react/jsx-runtime';

const employeeData: DataKPIType[] = [
  {
    key: 1,
    proposer: 'proposer1 Employee',
    criteria: 'criteria1 Employee',
    objective: 'objective1 Employee',
    reality: 'reality1 Employee',
    targetPoint: 'targetPoint1 Employee',
    implementationTime: 'implementationTime1 Employee',
    calculationMethod: 'calculationMethod1 Employee',
  },
];

export default function EmployeeKPITable() {
  return (
    <Fragment>
      <TableCustom
        columns={employeeKPIColumns}
        dataSource={employeeData}
        loading={false}
        rowKey={(record) => record.key}
        pagination={{ current: 1, pageSize: 7 }}
        scroll={{ x: 1450 }}
      />
    </Fragment>
  );
}
