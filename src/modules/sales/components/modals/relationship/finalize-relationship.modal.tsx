/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { StatusRelationship } from '@/modules/sales/enum/status.enum';
import { useRelationship } from '@/modules/sales/services/relationship.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';

type FinalizeRelationShipProps = {
  closeModal: () => void;
  data: DataRelationshipType;
};
export const FinalizeRelationShip = ({ closeModal, data }: FinalizeRelationShipProps) => {
  const { updateStatusRelationship } = useRelationship();
  const [loading] = useWatchLoading(['edit-relationshipStatus', false]);

  const handleFinalizeRelationShip = async () => {
    const editStatus = await updateStatusRelationship({
      id: data.id,
      applicationUserId: data.applicationUser.id,
      status: StatusRelationship.Processing,
    });

    if (editStatus) {
      closeModal();
    }
  };

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý chốt đề xuất mối quan hệ này</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" onClick={handleFinalizeRelationShip}>
            Xác nhận
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
