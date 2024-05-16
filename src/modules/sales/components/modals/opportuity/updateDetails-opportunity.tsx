/** @jsxImportSource @emotion/react */
import { useLocale } from '@/hooks/locale.hook';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space, Select } from 'antd';
import { Fragment } from 'react';

type AssignOpportuityProps = {
  closeModal: () => void;
};

export const UpdateDetailsOpportunity = ({ ...props }: AssignOpportuityProps) => {
  const { closeModal } = props;
  const { formatMessage } = useLocale();

  const oncancel = () => {
    closeModal();
  };
  return (
    <Fragment>
      <h3 css={formTitleStyle}>Chi tiết cập nhật</h3>
      <div>
        <Row justify="space-between" css={rowTableStyle}>
          <Col>
            <p css={titleContentTableStyle}>Tên cập nhật</p>
          </Col>
          <Col>
            <p css={titleNameTableStyle}>Tanner Finsha</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowTableStyle}>
          <Col>
            <p css={titleContentTableStyle}>Mục tiêu </p>
          </Col>
          <Col>
            <p css={titleValueTableStyle}>Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowTableStyle}>
          <Col>
            <p css={titleContentTableStyle}>Hoạt động</p>
          </Col>
          <Col>
            <p css={titleValueTableStyle}>Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowTableStyle}>
          <Col>
            <p css={titleContentTableStyle}>Thời điểm</p>
          </Col>
          <Col>
            <p css={titleValueTableStyle}>01/08/2024</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowTableStyle}>
          <Col>
            <p css={titleContentTableStyle}>Kết quả</p>
          </Col>
          <Col>
            <p css={titleValueTableStyle}>Tốt</p>
          </Col>
        </Row>

        <Row justify="end">
          <Space>
            <Button type="primary" onClick={oncancel}>
              Xác nhận
            </Button>
          </Space>
        </Row>
      </div>
    </Fragment>
  );
};

const formTitleStyle = css`
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.6rem;
  margin: 3rem 0;
  color: rgba(21, 41, 75, 1);
  text-align: center;
`;

const titleContentTableStyle = css`
  font-size: 1.2rem;
  color: #42526d;
  font-weight: 500;
`;
const titleNameTableStyle = css`
  font-size: 1.4rem;
  color: #101828;
  font-weight: 500;
`;
const titleValueTableStyle = css`
  font-size: 1.2rem;
  color: #42526d;
  font-weight: 500;
`;

const rowTableStyle = css`
  margin-bottom: 1.5rem;
`;
