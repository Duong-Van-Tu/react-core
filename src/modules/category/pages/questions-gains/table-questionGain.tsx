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

import { questionGainsColumns } from './column/question-gains.column';
import { useModalQuestionGains } from '../../components/modals/question-gains';
import { useQuestionGain } from '../../services/question-gain.service';

export default function TableQuestionGains() {
  const [questionIds, setQuestionIds] = useState<string[]>();
  const { openModal } = useModalQuestionGains();
  const { getAllQuestionGain } = useQuestionGain();
  const [loading] = useWatchLoading(['get-questionGain', true]);
  const { data, pagination } = useRootSelector((state) => state.category.questionGain);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getAllQuestionGain({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
    });
  };

  const handleTableChange = (page: number) => {
    getAllQuestionGain({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
    });
  };

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataReationshipLevelType[]) => {
      setQuestionIds(selectedRows.map((row) => row.id!));
    },
  };

  const handleDeleteSupplier = () => {
    openModal('Delete Question', undefined, questionIds);
  };

  useEffect(() => {
    getAllQuestionGain({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
  }, [getAllQuestionGain, tab]);

  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add Question')}
        type="primary"
        css={addRelationshipLvStyle}
        iconPosition="start"
        size="large"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />
        <span>Thêm câu hỏi</span>
      </Button>

      <div css={searchContainer}>
        <Search onSearch={handleSearch} />
      </div>
      <div css={checkBoxStyle}>
        <Button disabled={!questionIds} onClick={() => handleDeleteSupplier()} size="middle" danger>
          Xoá câu hỏi đã chọn
        </Button>
      </div>
      <TableCustom
        rowSelection={rowSelection}
        columns={questionGainsColumns}
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
