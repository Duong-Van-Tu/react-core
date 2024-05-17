/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { Button, Col, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { useRootSelector } from '@/hooks/selector.hook';
import { useKPI } from '@/modules/sales/services/kpi.service';

type ReportProps = {
  closeModal: () => void;
  data: DataKPIType;
};

export const Report = ({ closeModal, data }: ReportProps) => {
  const { showReport } = useKPI();
  const report = useRootSelector((state) => state.sale.kpi.report);

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    showReport(data);
  }, [data]);

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Báo cáo</h3>
      <div css={contentStyle}>
        <Row justify="space-between">
          <Col>Tên người đề xuất</Col>
          <Col>{`${report?.userSuggest?.firstName ?? ''} ${report?.userSuggest?.lastName ?? ''}`}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Tiêu chí</Col>
          <Col>{report?.criteria}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Điểm mục tiêu</Col>
          <Col>{report?.targetKPI}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Thời gian thực hiện</Col>
          <Col>{`${dayjs(report?.startTime).format('DD/MM/YYYY')} - ${dayjs(report?.endTime).format('DD/MM/YYYY')}`}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Thực tế</Col>
          <Col>{report?.actualKPI}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Điểm thực tế</Col>
          <Col>{report?.actualPoint}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Trạng thái</Col>
          <Col>{report?.goalStatus?.name}</Col>
        </Row>
        <Row justify="end">
          <Space css={reportFooter}>
            <Button onClick={oncancel}>Chia sẻ</Button>
            <Button type="primary" onClick={oncancel}>
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
