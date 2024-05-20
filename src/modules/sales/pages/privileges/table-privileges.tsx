/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { myPrivilegesColumns } from './columns';
import { DataPrivilegesType } from './type.privileges';
import { Button, Col, Row } from 'antd';
import { CustomIcon } from '@/components/icons';
import { usePermission } from '@/hooks/permission.hook';
import { useModalPrivileges } from '../../components/modals/privileges';
import { Search } from '@/components/search';
import { Key } from 'antd/es/table/interface';

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

const rowSelection = {
  onChange: (_selectedRowKeys: Key[], selectedRows: DataKPIType[]) => {
    console.log({ selectedRows });
  },
};
const handleSearch = () => {};

export default function TablePrivileges() {
  const { openModal } = useModalPrivileges();
  const { isAdmin, isSaleDirector } = usePermission();
  return (
    <div css={rootStyle}>
      {(isAdmin || isSaleDirector) && (
        <Button
          onClick={() => openModal('Add Privileges')}
          type="primary"
          css={addKPIBtnStyle}
          iconPosition="start"
          size="large"
        >
          <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
          <span>Thêm Quyền lợi</span>
        </Button>
      )}
      <div css={searchContainer}>
        <Search onSearch={handleSearch} status={[]} loadingStatus={false} />
      </div>

      <Row css={rowHeaderStyle} justify="space-between" align="bottom">
        <Col>
          <Button onClick={() => openModal('Delete KPI')} size="large" danger>
            Xoá Quyền lợi đã chọn
          </Button>
        </Col>
        <Col>Tổng điểm đạt được: 10</Col>
      </Row>
      <TableCustom
        rowSelection={rowSelection}
        columns={myPrivilegesColumns}
        dataSource={myData}
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

const addKPIBtnStyle = css`
  position: absolute;
  right: 0;
  top: -10rem;
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const searchContainer = css`
  margin-top: 2.6rem;
`;

const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;
