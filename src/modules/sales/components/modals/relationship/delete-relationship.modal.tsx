/** @jsxImportSource @emotion/react */
import { Pagination } from '@/constants/pagination';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useRelationship } from '@/modules/sales/services/relationship.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useEffect } from 'react';
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
  const pageIndex = useRootSelector((state) => state.sale.kpi.pagination?.pageIndex);
  const [loading] = useWatchLoading(['delete-relationship', false]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');
  const dataRelationship = useRootSelector((state) => state.sale.relationship.data);

  const handleDeleteRelationship = async () => {
    const deleted = await deleteRelationship(!!data ? [data.id!] : relationshipIds);
    if (deleted) {
      closeModal();
    }
  };

  useEffect(() => {
    if (dataRelationship.length === 0) {
      getAllRelationship({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
        roleType: tab!,
      });
    }
  }, [dataRelationship]);

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
