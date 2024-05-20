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
import { useLocation } from 'react-router-dom';
import { RoleType } from '@/enum/role.enum';

export default function TableKPI() {
  const { openModal } = useModalKPI();
  const { getAllKPI, getAllStatusKPI } = useKPI();
  const [loading, loadingStatus] = useWatchLoading(['get-kpi', true], ['status-kpi', true]);

  const { data, pagination, status, totalExtend } = useRootSelector((state) => state.sale.kpi);
  const { isAdmin, isSaleDirector } = usePermission();
  const [goalIds, setGoalIds] = useState<string[]>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

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

  useEffect(() => {
    getAllKPI({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
    });
    getAllStatusKPI();
  }, [getAllKPI, getAllStatusKPI, tab]);

  return (
    <div css={rootStyle}>
      {(isAdmin || isSaleDirector) && (
        <Button
          onClick={() => openModal('Add KPI')}
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
            onClick={() => openModal('Delete KPI', undefined, goalIds)}
            size="large"
            danger
          >
            Xoá mục tiêu đã chọn
          </Button>
        </Col>
        <Col>Tổng điểm đạt được: {totalExtend ?? 0}</Col>
      </Row>
      <TableCustom
        rowSelection={rowSelection}
        columns={columnTable}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={{
          current: pagination?.pageIndex,
          pageSize: Pagination.PAGESIZE,
          total: pagination?.totalRecords,
          position: ['bottomCenter'],
          onChange: (page) => {
            getAllKPI({
              pageIndex: page,
              pageSize: Pagination.PAGESIZE,
              roleType: tab!,
            });
          },
        }}
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

const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;

const searchContainer = css`
  margin-top: 2.6rem;
`;
