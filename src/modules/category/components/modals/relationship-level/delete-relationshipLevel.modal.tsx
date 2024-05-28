/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useRelationshipLevel } from '@/modules/category/services/relationshipLevel.service';
type DeleteRelationshipLevelProps = {
  closeModal: () => void;
  data?: DataReationshipLevelType;
  relationshipLvIds: string[];
};
export const DeleteRelationshipLevel = ({
  closeModal,
  relationshipLvIds,
  data,
}: DeleteRelationshipLevelProps) => {
  const { deleteRelationshipLevel, getAllRelationshipLevel } = useRelationshipLevel();
  const pageIndex =
    useRootSelector((state) => state.category.relationshipLevel.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-relationshipLevel', false]);
  const dataRelationshipLevel = useRootSelector((state) => state.category.relationshipLevel.data);
  const handledeleteRelationshipLevel = async () => {
    const deleteclient = await deleteRelationshipLevel(!!data ? [data.id!] : relationshipLvIds);
    if (deleteclient) {
      closeModal();
    } else {
      console.error('Failed to delete relationship Level');
    }
  };
  useEffect(() => {
    if (dataRelationshipLevel.length === 0) {
      getAllRelationshipLevel({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
      });
    }
  }, [dataRelationshipLevel]);
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các mục tiêu đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handledeleteRelationshipLevel}>
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
