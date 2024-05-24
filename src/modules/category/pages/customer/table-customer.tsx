/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';

import { Search, SearchParams } from '@/components/search';
import { customerColumns } from './column/customer.column';
import { CustomIcon } from '@/components/icons';
import { useModalCustomer } from '../../components/modals/customer';
import { useRootSelector } from '@/hooks/selector.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useCustomer } from '../../services/customer.service';
import { Key } from 'antd/es/table/interface';
import { Pagination } from '@/constants/pagination';

export default function TableCustomer() {
  const { openModal } = useModalCustomer();
  const { getAllCustomer } = useCustomer();
  const [customerIds, setCustomerIds] = useState<string[]>();

  const { data, pagination } = useRootSelector((state) => state.category.customer);
  const [loading] = useWatchLoading(['get-customer', true]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getAllCustomer({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
      roleType: tab!,
    });
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataCustomerType[]) => {
      setCustomerIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleTableChange = (page: number) => {
    getAllCustomer({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
    });
  };

  useEffect(() => {
    getAllCustomer({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      roleType: tab!,
    });
  }, [getAllCustomer, tab]);

  const handleDeleteCustomer = () => {
    openModal('Delete Customer', undefined, customerIds);
  };
  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add Customer')}
        type="primary"
        css={addKCustomerStyle}
        iconPosition="start"
        size="large"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
        <span>Thêm khách hàng</span>
      </Button>

      <div css={searchContainer}>
        <Search onSearch={handleSearch} />
      </div>
      <div css={checkBoxStyle}>
        <Button disabled={!customerIds} onClick={() => handleDeleteCustomer()} size="large" danger>
          Xoá mục tiêu đã chọn
        </Button>
      </div>
      <TableCustom
        rowSelection={rowSelection}
        columns={customerColumns}
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
