import { TableCustom } from '@/components/table';
import { employeeKPIColumns } from './columns/employee-kpi.column';
import { Fragment } from 'react/jsx-runtime';

export default function EmployeeKPITable() {
  return (
    <Fragment>
      <TableCustom
        columns={employeeKPIColumns}
        dataSource={[]}
        loading={false}
        rowKey={(record) => record.key}
        pagination={{ current: 1, pageSize: 7 }}
        scroll={{ x: 1450 }}
      />
    </Fragment>
  );
}
