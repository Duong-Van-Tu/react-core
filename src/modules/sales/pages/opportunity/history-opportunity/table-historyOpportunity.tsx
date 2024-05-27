/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Space } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { getTenant } from '@/utils/common';
import { useModalOpportunity } from '@/modules/sales/components/modals/opportunity';
import { useEffect } from 'react';
import { Pagination } from '@/constants/pagination';
import { useOpportunity } from '@/modules/sales/services/opportunity.service';
import { useRootSelector } from '@/hooks/selector.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { historyOpportunityColumns } from '../columns/history-opportunity.column';
import { ModalOpportunityType } from '@/modules/sales/enum/modal.enum';

export function TableHistoryOpportunity() {
  const navigate = useNavigate();
  const tenant = getTenant();
  const { openModal } = useModalOpportunity();
  const { getAllHistoryOpportunity, getOpportunityById } = useOpportunity();
  const { pagination, history, detail } = useRootSelector((state) => state.sale.opportunity);
  const [loading] = useWatchLoading(['get-historyOpportunity', true]);
  const { id: opportunityId } = useParams();

  const handleTableChange = (page: number) => {
    getAllHistoryOpportunity({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
    });
  };

  useEffect(() => {
    getAllHistoryOpportunity({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
    getOpportunityById(opportunityId!);
  }, [getAllHistoryOpportunity, getOpportunityById, opportunityId]);

  return (
    <div css={rootStyle}>
      <div css={containerStyle}>
        <h3 css={titleStyle}>Cập nhật cơ hội</h3>
        <Space direction="vertical">
          <Button css={closeStyle} onClick={() => navigate(`/sales/opportunity?tenant=${tenant}`)}>
            <CustomIcon color="rgba(0, 0, 0, 1)" width={16} height={16} type="close" />
            <LocaleFormatter id="title.exit" />
          </Button>
          <Button
            onClick={() => openModal(ModalOpportunityType.CreateHistoryOpportunity, detail)}
            type="primary"
            css={addBtnStyle}
            iconPosition="start"
            size="large"
          >
            <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />{' '}
            <span>Thêm cập nhật</span>
          </Button>
        </Space>
        <TableCustom
          css={tableStyle}
          columns={historyOpportunityColumns}
          dataSource={history}
          loading={loading}
          rowKey={(record) => record.id}
          onTableChange={(page) => handleTableChange(page)}
          pagination={{
            current: pagination?.pageIndex,
            pageSize: Pagination.PAGESIZE,
            total: pagination?.totalRecords,
            position: ['bottomCenter'],
          }}
          scroll={{ x: 1200 }}
        />
      </div>
    </div>
  );
}

const rootStyle = css`
  display: flex;
  justify-content: center;
  margin: 4rem 0;
`;

const containerStyle = css`
  max-width: 1200px;
  position: relative;
`;

const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.6rem;
  font-weight: 500;
`;

const tableStyle = css`
  margin-top: 6rem;
`;

const addBtnStyle = css`
  position: absolute;
  right: 0;
  top: 5.4rem;
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const closeStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  &:hover {
    svg {
      path {
        fill: #4096ff;
      }
    }
  }
`;
