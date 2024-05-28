/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Search, SearchParams } from '@/components/search';
import { CustomIcon } from '@/components/icons';
import { useRootSelector } from '@/hooks/selector.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { Key } from 'antd/es/table/interface';
import { Pagination } from '@/constants/pagination';
import { useQuery } from '@/hooks/query.hook';
import { useModalProject } from '../../components/modals/project';
import { useProject } from '../../services/project.service';
import { projectColumns } from './column/project.colum';

export default function TableProject() {
  const { openModal } = useModalProject();
  const { getAllProject } = useProject();
  const [projectIds, setProjectIds] = useState<string[]>();

  const { data, pagination } = useRootSelector((state) => state.category.project);
  const [loading] = useWatchLoading(['get-project', true]);

  const { textSearch, time } = useQuery();

  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getAllProject({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
    });
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataCustomerType[]) => {
      setProjectIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleTableChange = (page: number) => {
    getAllProject({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
      textSearch: textSearch ? decodeURI(textSearch).replace(/\+/g, ' ') : undefined,

      time,
    });
  };

  useEffect(() => {
    getAllProject({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
  }, [getAllProject]);

  const handleDeleteCustomer = () => {
    openModal('Delete Project', undefined, projectIds);
  };
  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add Project')}
        type="primary"
        css={addKProjectStyle}
        iconPosition="start"
        size="large"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
        <span>Thêm dự án</span>
      </Button>

      <div css={searchContainer}>
        <Search onSearch={handleSearch} />
      </div>
      <div css={checkBoxStyle}>
        <Button disabled={!projectIds} onClick={() => handleDeleteCustomer()} size="middle" danger>
          Xoá dự án đã chọn
        </Button>
      </div>
      <TableCustom
        rowSelection={rowSelection}
        columns={projectColumns}
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

const addKProjectStyle = css`
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
