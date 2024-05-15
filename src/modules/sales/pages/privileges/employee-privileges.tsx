/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { DataPrivilegesType } from './type.privileges';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import { myPrivilegesColumns } from './columns/employee-privileges.column';

import { CustomIcon } from '@/components/icons';
import { Button, Col, Row } from 'antd';
import { Search } from '@/components/search';
import { useModalPrivileges } from '../../components/modals/privileges';

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
  const { openModal } = useModalPrivileges();
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    // setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    // if (e.target.checked) {
    //   onSelectChange(data.map((item) => item.key));
    // } else {
    //   onSelectChange([]);
    // }
  };
  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add Privileges')}
        type="primary"
        css={addPrivilegesBtnStyle}
        iconPosition="start"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />{' '}
        <span>Thêm đề xuất</span>
      </Button>
      <Search />
      <Row css={rowHeaderStyle} justify="start">
        <Col>
          <Checkbox onChange={handleSelectAllChange}>Chọn tất cả</Checkbox>
        </Col>
      </Row>
      <TableCustom
        columns={myPrivilegesColumns}
        dataSource={employeeData}
        loading={false}
        rowKey={(record) => record.key}
        pagination={{ current: 1, pageSize: 7 }}
        scroll={{ x: 1450 }}
      />
    </div>
  );
}

const rootStyle = css`
  position: relative;
`;

const addPrivilegesBtnStyle = css`
  position: absolute;
  right: 0;
  top: -6rem;
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;
