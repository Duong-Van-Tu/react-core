/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';
import { TableCustom } from '@/components/table';
import columns from './columns';
import { Search, SearchParams } from '@/components/search';
import { Button, Col, Row } from 'antd';
import { useModalKPI } from '../../components/modals/kpi';
import { CustomIcon } from '@/components/icons';
import { useKPI } from '../../services/kpi.service';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { Key } from 'antd/es/table/interface';
import { usePermission } from '@/hooks/permission.hook';
import { RoleType } from '@/enum/role.enum';
import { useQuery } from '@/hooks/query.hook';
import { ModalKPIType } from '../../enum/modal.enum';

export default function TableKPI() {
  const { openModal } = useModalKPI();
  const { getAllKPI, getAllStatusKPI } = useKPI();
  const [loading, loadingStatus, loadingDelete] = useWatchLoading(
    ['get-kpi', true],
    ['status-kpi', true],
    ['delete-kpi', false],
  );

  const { data, pagination, status, totalExtend } = useRootSelector((state) => state.sale.kpi);
  const { isSaleDirector, isSale, isSupplier, isAdministrator } = usePermission();
  const [goalIds, setGoalIds] = useState<string[]>();
  const { tab, textSearch, time, statusId } = useQuery();

  const columnTable = useMemo(() => {
    if (isSaleDirector && tab === RoleType.MySelf) {
      return columns?.slice(1);
    }
    return columns;
  }, [tab, isSaleDirector]);

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataKPIType[]) => {
      setGoalIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleSearch = ({ textSearch, statusId, time }: SearchParams) => {
    getAllKPI({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      statusId,
      time,
      roleType: tab!,
    });
  };

  const handleTableChange = (page: number) => {
    getAllKPI({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
      textSearch: textSearch ? decodeURI(textSearch).replace(/\+/g, ' ') : undefined,
      time,
      statusId,
    });
  };

  useEffect(() => {
    if (tab) {
      getAllKPI({
        pageIndex: Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
        roleType: tab,
      });
    }
    getAllStatusKPI();
  }, [getAllKPI, getAllStatusKPI, tab]);

  useEffect(() => {
    if (loadingDelete) {
      setGoalIds(undefined);
    }
  }, [loadingDelete]);

  const addKPIBtnStyle = isSale || isSupplier ? addKPIBtnStyleSale : addKPIBtnStyleBase;
  return (
    <div css={rootStyle}>
      {((isSaleDirector && tab === RoleType.MySelf) || isSale || isSupplier) && (
        <Button
          onClick={() => openModal(ModalKPIType.AddKPI)}
          type="primary"
          css={addKPIBtnStyle}
          iconPosition="start"
          size="large"
        >
          <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
          <span>Thêm mục tiêu</span>
        </Button>
      )}

      <div css={searchContainer}>
        <Search onSearch={handleSearch} status={status as any} loadingStatus={loadingStatus} />
      </div>
      <Row css={rowHeaderStyle} justify="space-between" align="bottom">
        <Col>
          <Button
            disabled={!goalIds}
            onClick={() => openModal(ModalKPIType.DeleteKPI, undefined, goalIds)}
            size="middle"
            danger
          >
            Xoá mục tiêu đã chọn
          </Button>
        </Col>
        <Col>Tổng điểm đạt được: {totalExtend ?? 0}</Col>
      </Row>
      <TableCustom
        rowSelection={!isAdministrator ? rowSelection : undefined}
        columns={columnTable}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        onTableChange={(page) => handleTableChange(page)}
        pagination={{
          current: pagination.pageIndex,
          pageSize: pagination.pageSize,
          total: pagination.totalRecords,
          position: ['bottomCenter'],
        }}
        scroll={{ x: 1845 }}
      />
    </div>
  );
}

const rootStyle = css`
  position: relative;
`;

const addKPIBtnStyleBase = css`
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

const addKPIBtnStyleSale = css`
  ${addKPIBtnStyleBase}
  top: -5rem;
`;

const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;

const searchContainer = css`
  margin-top: 2.6rem;
`;
