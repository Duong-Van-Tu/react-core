/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';
import { TableCustom } from '@/components/table';
import columns from './columns';
import { Search, SearchParams } from '@/components/search';
import { Button, Col, Row } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { Key } from 'antd/es/table/interface';
import { usePermission } from '@/hooks/permission.hook';
import { RoleType } from '@/enum/role.enum';
import { useQuery } from '@/hooks/query.hook';
import { useRelationship } from '../../services/relationship.service';

export default function TableRelationship() {
  const { getAllRelationship, getAllStatusRelationship } = useRelationship();
  const [loading, loadingStatus] = useWatchLoading(
    ['get-relationship', true],
    ['status-relationship', true],
  );

  const { data, pagination, status, totalExtend } = useRootSelector(
    (state) => state.sale.relationship,
  );
  const { isSaleDirector, isSale } = usePermission();
  const [relationshipIds, setRelationshipIds] = useState<string[]>();
  const { tab, textSearch, time, statusId } = useQuery();

  const columnTable = useMemo(() => {
    if (isSaleDirector && tab === RoleType.MySelf) {
      return columns?.slice(1);
    }
    return columns;
  }, [tab, isSaleDirector]);

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataRelationshipType[]) => {
      setRelationshipIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleSearch = ({ textSearch, statusId, time }: SearchParams) => {
    getAllRelationship({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      statusId,
      time,
      roleType: tab!,
    });
  };

  const handleTableChange = (page: number) => {
    getAllRelationship({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
      textSearch: textSearch ? decodeURI(textSearch).replace(/\+/g, ' ') : undefined,
      time,
      statusId,
    });
  };

  useEffect(() => {
    getAllRelationship({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
    });
    getAllStatusRelationship();
  }, [getAllRelationship, getAllStatusRelationship, tab]);

  const addRelationshipBtnStyle = isSale
    ? addRelationshipBtnStyleSale
    : addRelationshipBtnStyleBase;
  return (
    <div css={rootStyle}>
      {(isSaleDirector || isSale) && tab !== RoleType.Employee && (
        <Button type="primary" css={addRelationshipBtnStyle} iconPosition="start" size="large">
          <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
          <span>Thêm mục tiêu</span>
        </Button>
      )}

      <div css={searchContainer}>
        <Search onSearch={handleSearch} status={status as any} loadingStatus={loadingStatus} />
      </div>
      <Row css={rowHeaderStyle} justify="space-between" align="bottom">
        <Col>
          <Button disabled={!relationshipIds} size="middle" danger>
            Xoá mối quan hệ đã chọn
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
        onTableChange={(page) => handleTableChange(page)}
        pagination={{
          current: pagination?.pageIndex,
          pageSize: Pagination.PAGESIZE,
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

const addRelationshipBtnStyleBase = css`
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

const addRelationshipBtnStyleSale = css`
  ${addRelationshipBtnStyleBase}
  top: -5rem;
`;

const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;

const searchContainer = css`
  margin-top: 2.6rem;
`;
