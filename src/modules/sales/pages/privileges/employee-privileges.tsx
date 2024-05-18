/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { myPrivilegesColumns } from './columns/employee-privileges.column';

import { CustomIcon } from '@/components/icons';
import { Button } from 'antd';
import { useModalPrivileges } from '../../components/modals/privileges';

export default function EmployeePrivilegesTable() {
  const { openModal } = useModalPrivileges();

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
      {/* <Search /> */}

      <TableCustom
        columns={myPrivilegesColumns}
        dataSource={[]}
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
