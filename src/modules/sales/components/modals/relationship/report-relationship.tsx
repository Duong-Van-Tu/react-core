/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Row } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { StatusRelationship } from '@/modules/sales/enum/status.enum';
import { Message } from '@/components/message';

type ReportRelationshipProps = {
  closeModal: () => void;
  data: DataRelationshipType;
};

export const ReportRelationship = ({ closeModal, data }: ReportRelationshipProps) => {
  let messageType: MessageType;
  switch (data?.relationshipStatus.code) {
    case StatusRelationship.Completed:
      messageType = 'success';
      break;
    case StatusRelationship.Pending:
    case StatusRelationship.Processing:
      messageType = 'info';
      break;
    default:
      messageType = 'warning';
  }

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Báo cáo đề xuất mối quan hệ với khách hàng</h3>
      <div css={contentStyle}>
        <Row justify="space-between">
          <Col>Họ và tên</Col>
          <Col>{data?.applicationUser?.fullName}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Vị trí làm việc</Col>
          <Col>{data?.position}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Mức độ QH hiện tại</Col>
          <Col>{data?.currentRelationshipLevel}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Mức độ QH mục tiêu</Col>
          <Col>{data?.targetRelationshipLevel}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Lý do cần phải nâng cấp quan hệ</Col>
          <Col>{data?.reason}</Col>
        </Row>
        <Row justify="space-between">
          <Col>Điểm mục tiêu</Col>
          <Col>{data?.point}</Col>
        </Row>
        <Row justify="space-between" align="bottom">
          <Col>
            <LocaleFormatter id="title.status" />
          </Col>
          <Col>
            {data.relationshipStatus ? (
              <Message hasBackground type={messageType}>
                {data.relationshipStatus.name!}
              </Message>
            ) : (
              ''
            )}
          </Col>
        </Row>

        <Button css={btnConfirmReport} type="primary" onClick={() => closeModal()}>
          Xác nhận
        </Button>
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

const titleStyle = css`
  margin-top: 2rem;
  font-size: 2rem;
  line-height: 2.8rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const btnConfirmReport = css`
  width: 100%;
  margin-top: 2rem;
`;
