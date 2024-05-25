/** @jsxImportSource @emotion/react */
import { Pagination } from '@/constants/pagination';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useRelationship } from '@/modules/sales/services/relationship.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useLocation } from 'react-router-dom';

type DeleteRelationshipProps = {
  closeModal: () => void;
  relationshipIds: string[];
  data?: DataRelationshipType;
};
export const DeleteRelationship = ({
  closeModal,
  relationshipIds,
  data,
}: DeleteRelationshipProps) => {
  const { deleteRelationship, getAllRelationship } = useRelationship();
  const pageIndex = useRootSelector((state) => state.sale.kpi.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-relationship', false]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  const handleDeleteRelationship = async () => {
    const deleteGoal = await deleteRelationship(!!data ? [data.id!] : relationshipIds);
    if (deleteGoal) {
      closeModal();
      if (relationshipIds.length === Pagination.PAGESIZE) {
        getAllRelationship({
          pageIndex: pageIndex - 1 || 1,
          pageSize: Pagination.PAGESIZE,
          roleType: tab!,
        });
      }
    }
  };

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá mối quan hệ đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteRelationship}>
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
