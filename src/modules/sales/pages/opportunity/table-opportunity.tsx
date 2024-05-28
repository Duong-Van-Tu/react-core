/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { opportunityColumns } from './columns/opportunity.column';
import { useModalOpportunity } from '../../components/modals/opportunity';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useOpportunity } from '../../services/opportunity.service';
import { Pagination } from '@/constants/pagination';
import { Search, SearchParams } from '@/components/search';
import { useRootSelector } from '@/hooks/selector.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { getTenant } from '@/utils/common';
import { Key } from 'antd/es/table/interface';
import { useQuery } from '@/hooks/query.hook';
import { ModalOpportunityType } from '../../enum/modal.enum';

export default function TableOpportunity() {
  const { openModal } = useModalOpportunity();
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const { getAllOpportunity, getAllStatusOpportunity } = useOpportunity();
  const [opportunityIds, setOpportunityIds] = useState<string[]>();
  const [loading, loadingStatus, loadingDelete] = useWatchLoading(
    ['get-opportunity', true],
    ['status-opportunity', true],
    ['delete-opportunity', false],
  );
  const { pagination, status, data } = useRootSelector((state) => state.sale.opportunity);
  const { textSearch, time, statusId } = useQuery();

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataKPIType[]) => {
      setOpportunityIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleTableChange = (page: number) => {
    getAllOpportunity({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
      textSearch: textSearch ? decodeURI(textSearch).replace(/\+/g, ' ') : undefined,
      time,
      statusId,
    });
  };

  const handleSearch = ({ textSearch, statusId, time }: SearchParams) => {
    getAllOpportunity({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      statusId,
      time,
    });
  };

  useEffect(() => {
    getAllOpportunity({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
    getAllStatusOpportunity();
  }, [getAllOpportunity, getAllStatusOpportunity]);

  useEffect(() => {
    if (loadingDelete) {
      setOpportunityIds(undefined);
    }
  }, [loadingDelete]);

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.opportunity' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.opportunity' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>
          {pagination.totalRecords ?? 0} {formatMessage({ id: 'title.document.opportunity' })}
        </span>
      </div>
      <Button
        onClick={() => navigate(`add-opportunity?tenant=${getTenant()}`)}
        type="primary"
        css={addKOpportunityStyle}
        iconPosition="start"
        size="large"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />{' '}
        <span>Thêm cơ hội</span>
      </Button>
      <div css={searchContainer}>
        <Search onSearch={handleSearch} loadingStatus={loadingStatus} status={status as any} />
      </div>
      <Button
        disabled={!opportunityIds}
        onClick={() => openModal(ModalOpportunityType.Delete, undefined, opportunityIds)}
        size="middle"
        danger
      >
        Xoá cơ hội đã chọn
      </Button>
      <TableCustom
        css={tableStyle}
        rowSelection={rowSelection}
        columns={opportunityColumns}
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
        scroll={{ x: 2500 }}
      />
    </div>
  );
}

const rootStyle = css`
  position: relative;
`;

const subTitleStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2.3rem;
  font-weight: 600;
`;

const addKOpportunityStyle = css`
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  position: absolute;
  top: 1.4rem;
  right: 0;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const searchContainer = css`
  margin: 2.6rem 0;
`;

const tableStyle = css`
  margin-top: 2.6rem;
`;
