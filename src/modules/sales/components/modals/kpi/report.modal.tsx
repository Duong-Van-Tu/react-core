/** @jsxImportSource @emotion/react */
import { useKPI } from '@/modules/sales/services/kpi.service';
import { css } from '@emotion/react';
import { Button, Col, Row, Space } from 'antd';
import { useEffect } from 'react';

type ReportProps = {
  closeModal: () => void;
  data: DataKPIType;
};

export const Report = ({ closeModal, data }: ReportProps) => {
  const { showReport } = useKPI();

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    showReport(data);
  }, []);

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Báo cáo</h3>
      <div css={contentStyle}>
        <Row justify="space-between">
          <Col>Tên người đề xuất</Col>
          <Col>Dương Văn Tú</Col>
        </Row>
        <Row justify="space-between">
          <Col>Tiêu chí</Col>
          <Col>Số lượng khách hàng mới</Col>
        </Row>
        <Row justify="space-between">
          <Col>Điểm mục tiêu</Col>
          <Col>200</Col>
        </Row>
        <Row justify="space-between">
          <Col>Thời gian thực hiện</Col>
          <Col>01/05/2024 - 01/08/2024</Col>
        </Row>
        <Row justify="space-between">
          <Col>Thực tế</Col>
          <Col>4</Col>
        </Row>
        <Row justify="space-between">
          <Col>Điểm thực tế</Col>
          <Col>400</Col>
        </Row>
        <Row justify="space-between">
          <Col>Trạng thái</Col>
          <Col>Hoàn thành</Col>
        </Row>
        <Row justify="end">
          <Space css={reportFooter}>
            <Button onClick={oncancel}>Chia sẻ</Button>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Space>
        </Row>
      </div>
    </div>
  );
};

const rootStyle = css`
  padding: 1rem;
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  font-weight: 500;
`;

const reportFooter = css`
  margin-top: 1rem;
`;

const titleStyle = css`
  font-size: 2rem;
  line-height: 2.2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 500;
`;
