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
import { useModalSupplier } from '../../components/modals/supplier';
import { supplierColumns } from './column/supplier.column';
import { useRootSelector } from '@/hooks/selector.hook';
import { useSupplier } from '../../services/supplier.service';

export default function TableSupplier() {
  const [supplierIds, setSupplierIds] = useState<string[]>();
  const { openModal } = useModalSupplier();
  const { getAllSupplier } = useSupplier();
  const [loading] = useWatchLoading(['get-supplier', true]);
  const { data, pagination } = useRootSelector((state) => state.category.supplier);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');
  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getAllSupplier({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
    });
  };

  const handleTableChange = (page: number) => {
    getAllSupplier({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
    });
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataSupplierType[]) => {
      setSupplierIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleDeleteSupplier = () => {
    openModal('Delete Supplier', undefined, supplierIds);
  };

  useEffect(() => {
    getAllSupplier({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
  }, [getAllSupplier, tab]);

  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add Supplier')}
        type="primary"
        css={addKCustomerStyle}
        iconPosition="start"
        size="large"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
        <span>Thêm nhà cung cấp</span>
      </Button>

      <div css={searchContainer}>
        <Search onSearch={handleSearch} />
      </div>
      <div css={checkBoxStyle}>
        <Button disabled={!supplierIds} onClick={() => handleDeleteSupplier()} size="middle" danger>
          Xoá nhà cung cấp đã chọn
        </Button>
      </div>
      <TableCustom
        rowSelection={rowSelection}
        columns={supplierColumns}
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

const addKCustomerStyle = css`
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

const checkBoxStyle = css`
  margin: 1.1rem 0;
`;
