/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { columnsEmployee, columnsManager } from './columns';
import { Button } from 'antd';
import { CustomIcon } from '@/components/icons';
import { usePermission } from '@/hooks/permission.hook';
import { useModalPrivileges } from '../../components/modals/privileges';
import { Search, SearchParams } from '@/components/search';
import { Key } from 'antd/es/table/interface';
import { Fragment, useEffect, useMemo } from 'react';
import { useBenefit } from '../../services/benefit.service';
import { Pagination } from '@/constants/pagination';
import { useRootSelector } from '@/hooks/selector.hook';
import { RoleType } from '@/enum/role.enum';
import { useWatchLoading } from '@/hooks/loading.hook';

export default function TablePrivileges() {
  const { openModal } = useModalPrivileges();
  const { getAllStatusBenefit, getAllBenefit } = useBenefit();
  const [loading, loadingStatus] = useWatchLoading(['get-benefit', true], ['status-benefit', true]);
  const { isSaleDirector } = usePermission();
  const { data, pagination, status } = useRootSelector((state) => state.sale.benefit);
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  const columnTable = useMemo(() => {
    if (isSaleDirector && tab === RoleType.MySelf) {
      return columnsManager;
    }
    return columnsEmployee;
  }, [tab, isSaleDirector]);

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataKPIType[]) => {
      console.log({ selectedRows });
    },
  };
  const handleSearch = ({ textSearch, statusId, time }: SearchParams) => {
    getAllBenefit({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      statusId,
      time,
      roleType: tab!,
    });
  };

  const handleTableChange = (page: number) => {
    getAllBenefit({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
    });
  };

  useEffect(() => {
    getAllBenefit({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
    });
    getAllStatusBenefit();
  }, [getAllBenefit, getAllStatusBenefit, tab]);

  return (
    <div css={rootStyle}>
      {tab === RoleType.Employee && isSaleDirector && (
        <Fragment>
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
          <div css={searchContainer}>
            <Search onSearch={handleSearch} status={status as any} loadingStatus={loadingStatus} />
          </div>
          <Button css={deleteBtnStyle} onClick={() => openModal('Delete KPI')} size="large" danger>
            Xoá Quyền lợi đã chọn
          </Button>
        </Fragment>
      )}

      <TableCustom
        rowSelection={tab === RoleType.Employee ? rowSelection : undefined}
        columns={columnTable}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        onTableChange={(page) => handleTableChange(page)}
        pagination={
          isSaleDirector &&
          tab === RoleType.Employee && {
            current: pagination?.pageIndex,
            pageSize: Pagination.PAGESIZE,
            total: pagination?.totalRecords,
            position: ['bottomCenter'],
            onChange: handleTableChange,
          }
        }
        scroll={{ x: tab === RoleType.MySelf ? 1200 : 1800 }}
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
  top: -9rem;
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

const deleteBtnStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;
