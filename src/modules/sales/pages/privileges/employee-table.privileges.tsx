import { TableCustom } from '@/components/table';
import { DataPrivilegesType } from './type.privileges';
import { myPrivilegesColumns } from './columns/employee-privileges.column';
import { Fragment } from 'react/jsx-runtime';

const employeeData: DataPrivilegesType[] = [
  {
    key: 1,
    beneficiaryName: 'beneficiaryName employee',
    fixedMonthlySalary: 'fixedMonthlySalary employee',
    totalTargetVariableSalary: 'totalTargetVariableSalary employee',
    actualVariableSalary: 'actualVariableSalary employee',
    status: 'status employee',
  },
];

export default function EmployeePrivilegesTable() {
  return (
    <Fragment>
      <TableCustom
        columns={myPrivilegesColumns}
        dataSource={employeeData}
        loading={false}
        rowKey={(record) => record.key}
        pagination={{ current: 1, pageSize: 7 }}
        scroll={{ x: 1450 }}
      />
    </Fragment>
  );
}
