/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { Search, SearchParams } from '@/components/search';
import { CustomIcon } from '@/components/icons';
import { useRootSelector } from '@/hooks/selector.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useContract } from '../../services/contract.service';
import { Key } from 'antd/es/table/interface';
import { Pagination } from '@/constants/pagination';
import { contractColumns } from './column/contract.column';
import { useModalContract } from '../../components/modals/contract';

export default function TableContract() {
  const { openModal } = useModalContract();
  const { getAllContract } = useContract();
  const [contractIds, setContractIds] = useState<string[]>();

  const { data, pagination } = useRootSelector((state) => state.category.contract);
  const [loading] = useWatchLoading(['get-contract', true]);

  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getAllContract({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
    });
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataCustomerType[]) => {
      setContractIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleTableChange = (page: number) => {
    getAllContract({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
    });
  };

  useEffect(() => {
    getAllContract({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
  }, [getAllContract]);

  const handleDeleteContract = () => {
    openModal('Delete Contract', undefined, contractIds);
  };
  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add Contract')}
        type="primary"
        css={addKContractStyle}
        iconPosition="start"
        size="large"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
        <span>Thêm hợp đồng</span>
      </Button>

      <div css={searchContainer}>
        <Search onSearch={handleSearch} />
      </div>
      <div css={checkBoxStyle}>
        <Button disabled={!contractIds} onClick={() => handleDeleteContract()} size="middle" danger>
          Xoá hợp đồng đã chọn
        </Button>
      </div>
      <TableCustom
        rowSelection={rowSelection}
        columns={contractColumns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        onTableChange={(page) => handleTableChange(page)}
        pagination={{
          current: pagination?.pageIndex,
          pageSize: pagination?.pageSize,
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

const addKContractStyle = css`
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
