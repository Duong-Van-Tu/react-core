/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Search, SearchParams } from '@/components/search';
import { CustomIcon } from '@/components/icons';
import { useWatchLoading } from '@/hooks/loading.hook';
import { Key } from 'antd/es/table/interface';
import { Pagination } from '@/constants/pagination';
import { useRootSelector } from '@/hooks/selector.hook';
import { serviceColumns } from './column/service.column';
import { useModalService } from '../../components/modals/service-category';
import { useService } from '../../services/service-category.service';

export default function TableService() {
  const [serviceIds, setServiceIds] = useState<string[]>();
  const { openModal } = useModalService();
  const { getAllService } = useService();
  const [loading] = useWatchLoading(['get-service', true]);
  const { data, pagination } = useRootSelector((state) => state.category.sevice);
  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getAllService({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
    });
  };

  const handleTableChange = (page: number) => {
    getAllService({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
    });
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataServiceCategoryType[]) => {
      setServiceIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleDeleteSupplier = () => {
    openModal('Delete Service', undefined, serviceIds);
  };

  useEffect(() => {
    getAllService({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
  }, [getAllService]);

  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add Service')}
        type="primary"
        css={addKServiceStyle}
        iconPosition="start"
        size="large"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
        <span>Thêm mảng dịch vụ</span>
      </Button>

      <div css={searchContainer}>
        <Search onSearch={handleSearch} />
      </div>
      <div css={checkBoxStyle}>
        <Button disabled={!serviceIds} onClick={() => handleDeleteSupplier()} size="middle" danger>
          Xoá mảng dịch vụ đã chọn
        </Button>
      </div>
      <TableCustom
        rowSelection={rowSelection}
        columns={serviceColumns}
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

const addKServiceStyle = css`
  position: absolute;
  right: 0;
  top: -7.5rem;
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
