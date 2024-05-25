/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
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
import { useModalRelationship } from '../../components/modals/relationship';
import { ModalRelationshipType } from '../../enum/modal.enum';

export default function TableRelationship() {
  const { getAllRelationship, getAllStatusRelationship } = useRelationship();
  const { openModal } = useModalRelationship();
  const [loading, loadingStatus] = useWatchLoading(
    ['get-relationship', true],
    ['status-relationship', true],
  );

  const { data, pagination, status, totalExtend } = useRootSelector(
    (state) => state.sale.relationship,
  );
  const { isSaleDirector, isSale, isSupplier } = usePermission();
  const [relationshipIds, setRelationshipIds] = useState<string[]>();
  const { tab, textSearch, time, statusId } = useQuery();

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

  const addRelationshipBtnStyle =
    isSale || isSupplier ? addRelationshipBtnStyleSale : addRelationshipBtnStyleBase;
  return (
    <div css={rootStyle}>
      {isSaleDirector && tab !== RoleType.Employee && (
        <Button
          onClick={() => openModal(ModalRelationshipType.AddRelationship)}
          type="primary"
          css={addRelationshipBtnStyle}
          iconPosition="start"
          size="large"
        >
          <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
          <span>Thêm mối quan hệ</span>
        </Button>
      )}

      <div css={searchContainer}>
        <Search onSearch={handleSearch} status={status as any} loadingStatus={loadingStatus} />
      </div>
      <Row css={rowHeaderStyle} justify="space-between" align="bottom">
        <Col>
          <Button
            onClick={() =>
              openModal(ModalRelationshipType.DeleteRelationship, undefined, relationshipIds)
            }
            disabled={!relationshipIds}
            size="middle"
            danger
          >
            Xoá mối quan hệ đã chọn
          </Button>
        </Col>
        <Col>Tổng điểm đạt được: {totalExtend ?? 0}</Col>
      </Row>
      <TableCustom
        rowSelection={rowSelection}
        columns={columns}
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
