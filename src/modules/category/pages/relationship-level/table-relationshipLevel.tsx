/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { Search, SearchParams } from '@/components/search';
import { CustomIcon } from '@/components/icons';
import { useWatchLoading } from '@/hooks/loading.hook';
import { Key } from 'antd/es/table/interface';
import { Pagination } from '@/constants/pagination';
import { useRootSelector } from '@/hooks/selector.hook';
import { relationshipLevelColumns } from './column/relationship-level.column';
import { useModalRelationshipLevel } from '../../components/modals/relationship-level';
import { useRelationshipLevel } from '../../services/relationshipLevel.service';

export default function TableRelationshipLevel() {
  const [relationshipLvIds, setRelationshipLvIds] = useState<string[]>();
  const { openModal } = useModalRelationshipLevel();
  const { getAllRelationshipLevel } = useRelationshipLevel();
  const [loading] = useWatchLoading(['get-relationshipLevel', true]);
  const { data, pagination } = useRootSelector((state) => state.category.relationshipLevel);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getAllRelationshipLevel({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
      roleType: tab!,
    });
  };

  const handleTableChange = (page: number) => {
    getAllRelationshipLevel({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
    });
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataReationshipLevelType[]) => {
      setRelationshipLvIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleDeleteSupplier = () => {
    openModal('Delete RelationLevel', undefined, relationshipLvIds);
  };

  useEffect(() => {
    getAllRelationshipLevel({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
    });
  }, [getAllRelationshipLevel, tab]);

  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add RelationLevel')}
        type="primary"
        css={addRelationshipLvStyle}
        iconPosition="start"
        size="large"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
        <span>Thêm mức độ quan hệ</span>
      </Button>

      <div css={searchContainer}>
        <Search onSearch={handleSearch} />
      </div>
      <div css={checkBoxStyle}>
        <Button
          disabled={!relationshipLvIds}
          onClick={() => handleDeleteSupplier()}
          size="large"
          danger
        >
          Xoá mục tiêu đã chọn
        </Button>
      </div>
      <TableCustom
        rowSelection={rowSelection}
        columns={relationshipLevelColumns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        onTableChange={(page) => handleTableChange(page)}
        pagination={{
          current: pagination?.pageIndex,
          pageSize: pagination.pageSize,
          total: pagination?.totalRecords,
          position: ['bottomCenter'],
        }}
        scroll={{ x: 1450 }}
      />
    </div>
  );
}

const rootStyle = css`
  position: relative;
`;

const addRelationshipLvStyle = css`
  position: absolute;
  right: 0;
  top: -6.5rem;
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

const checkBoxStyle = css`
  margin: 1.1rem 0;
`;
