/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, FormProps, Row, Space } from 'antd';
import { Fragment } from 'react';
import Dot from '@/assets/svg/dot.svg?react';
import { useLocale } from '@/hooks/locale.hook';

type ProposedReportMyRelationshipsProps = {
  closeModal: () => void;
};
type FieldType = {
  fullName: string;
  jobPosition: string;
  CurrentRelationshipLevel: string;
  TargetlationshipLevel: string;
  ReasonUpgrade: string;
  targetScore: number;
  status: string;
  supervisorEvaluation: string;
};

export const ProposedReportMyRelationships = ({ ...props }: ProposedReportMyRelationshipsProps) => {
  const { closeModal } = props;
  const { formatMessage } = useLocale();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    closeModal();
  };

  const oncancel = () => {
    closeModal();
  };
  return (
    <Fragment>
      <h3 css={TitleStyle}>
        Báo cáo kết quả trạng thái <br /> mối quan hệ với khách hàng
      </h3>
      <div css={contentMyRelationshipsReportStyle}>
        <Row justify="space-between" css={rowStyle}>
          <Col span={12}>
            <p css={titleContentStyle}>
              {formatMessage({ id: 'title.myRelationships.proposedReport.fullName' })}
            </p>
          </Col>
          <Col span={12}>
            <p css={titleValuetyle}>Bùi Công Quân</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleContentStyle}>
              {formatMessage({ id: 'title.myRelationships.proposedReport.jobPosition' })}
            </p>
          </Col>
          <Col>
            <p css={titleValuetyle}>PP CNTT</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleContentStyle}>
              {formatMessage({
                id: 'title.myRelationships.proposedReport.CurrentRelationshipLevel',
              })}
            </p>
          </Col>
          <Col>
            <p css={titleValuetyle}>A</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleContentStyle}>
              {formatMessage({
                id: 'title.myRelationships.proposedReport.TargetlationshipLevel',
              })}
            </p>
          </Col>
          <Col>
            <p css={titleValuetyle}>B</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleContentStyle}>
              {formatMessage({
                id: 'title.myRelationships.proposedReport.ReasonUpgrade',
              })}
            </p>
          </Col>
          <Col>
            <p css={titleValuetyle}>
              Duy trì HĐ năm 2023 và tăng giá <br /> trị hợp đồng năm 2024
            </p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleContentStyle}>
              {formatMessage({
                id: 'title.myRelationships.proposedReport.targetScore',
              })}
            </p>
          </Col>
          <Col>
            <p css={titleValuetyle}>200</p>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col>
            <p css={titleContentStyle}>
              {formatMessage({
                id: 'title.status',
              })}
            </p>
          </Col>
          <Col>
            <div css={statusStyle}>
              <Dot />
              <p>Chốt đề xuất</p>
            </div>
          </Col>
        </Row>
      </div>

      <Row justify="end">
        <Space>
          <Button type="primary" htmlType="submit" onClick={oncancel} css={btnCloseStyle}>
            Đóng lại
          </Button>
        </Space>
      </Row>
    </Fragment>
  );
};

const contentMyRelationshipsReportStyle = css`
  margin: 3rem 0;
`;

const TitleStyle = css`
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.6rem;
  margin-top: 4rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: rgba(21, 41, 75, 1);
`;

const titleValuetyle = css`
  text-align: right;
  color: rgba(16, 24, 40, 1);
  font-weight: 600;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const titleContentStyle = css`
  text-align: left;
  color: rgba(66, 82, 109, 1);
  font-weight: 600;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
`;

const rowStyle = css`
  margin-bottom: 1.5rem;
`;

const statusStyle = css`
  padding: 0.2rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: rgba(236, 253, 243, 1);
  border-radius: 1.6rem;
  border: 1px solid transpatrent;
  svg path {
    fill: rgba(18, 183, 106, 1);
  }
  p {
    color: rgba(2, 122, 72, 1);
    font-weight: 700;
    font-size: 1.2rem;
    font-family: 'Inter', sans-serif;
  }
`;

const btnCloseStyle = css`
  border-radius: 0.8rem;
  background: rgba(0, 112, 184, 1);
  padding: 1.2rem 8.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
