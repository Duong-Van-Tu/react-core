/** @jsxImportSource @emotion/react */
import { Pagination } from '@/constants/pagination';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useOpportunity } from '@/modules/sales/services/opportunity.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';

type DeleteOpportunityProps = {
  closeModal: () => void;
  opportunityIds: string[];
  data?: DataOpportunityType;
};
export const DeleteOpportunity = ({ closeModal, opportunityIds, data }: DeleteOpportunityProps) => {
  const { deleteOpportunity, getAllOpportunity } = useOpportunity();
  const pageIndex = useRootSelector((state) => state.sale.kpi.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-opportunity', false]);

  const handleDeleteOpportunity = async () => {
    const isDelete = await deleteOpportunity(!!data ? [data.id!] : opportunityIds);
    if (isDelete) {
      closeModal();
      if (opportunityIds?.length === Pagination.PAGESIZE) {
        getAllOpportunity({
          pageIndex: pageIndex - 1 || 1,
          pageSize: Pagination.PAGESIZE,
        });
      }
    }
  };

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá cơ hội đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteOpportunity}>
            Xoá
          </Button>
        </Space>
      </Row>
    </div>
  );
};

const rootStyle = css`
  margin-top: 2rem;
  padding: 0 2rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2rem;
  text-align: center;
  margin-bottom: 2.4rem;
  font-weight: 500;
`;
