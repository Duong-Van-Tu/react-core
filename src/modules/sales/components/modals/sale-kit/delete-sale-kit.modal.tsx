/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { FilterSaleKitType, userSaleKit } from '@/modules/sales/services/sale-kit.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';

type DeleteSaleKitsProps = {
  closeModal: () => void;
  data?: FilterSaleKitType;
};

export const DeleteSaleKits = ({ closeModal, data }: DeleteSaleKitsProps) => {
  const { deleteSaleKit } = userSaleKit();

  const [loading] = useWatchLoading(['delete-benefit', false]);

  const handleDeleteSaleKits = () => {
    deleteSaleKit(data!);
    closeModal();
  };

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá sale kit đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteSaleKits}>
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
