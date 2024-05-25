/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useRootSelector } from '@/hooks/selector.hook';
import { ModalSaleKitType } from '../../enum/sale-kit.enum';
import { useModalSaleKit } from '../../components/modals/sale-kit';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

type Props = {
  checkedList: CheckboxValueType[];
};

const SaleKitHeader = ({ checkedList }: Props) => {
  const user = useRootSelector((state) => state.auth.user);

  const { openModal } = useModalSaleKit();

  const handleDeleteSaleKit = () => {
    openModal(ModalSaleKitType.Delete, {
      ids: checkedList.toString(),
      applicationUserId: user?.id,
    });
  };

  const handleAddSaleKit = () => {
    openModal(ModalSaleKitType.AddSaleKit, {
      ids: checkedList.toString(),
      applicationUserId: user?.id,
    });
  };

  return (
    <Row css={rowHeaderStyle} justify="space-between" align="bottom">
      <Col
        style={{
          margin: '6px 0',
        }}
      >
        <Button
          disabled={checkedList.length === 0}
          onClick={handleDeleteSaleKit}
          size="large"
          danger
        >
          Xóa mục tiêu đã chọn
        </Button>
      </Col>
      <Col
        style={{
          margin: '6px 0',
        }}
      >
        <Row gutter={[10, 10]} justify="space-between" align="bottom">
          <Col>
            <Button size="large">
              <Link to="/sales/sale-kit/auth">Quản lý quyền truy cập</Link>
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleAddSaleKit}
              icon={<PlusCircleOutlined />}
              size="large"
              type="primary"
            >
              Thêm tài liệu
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SaleKitHeader;

const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;
