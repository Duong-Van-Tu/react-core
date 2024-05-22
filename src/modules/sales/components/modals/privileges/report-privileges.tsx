/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Row, Space } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';

type ReportPrivilegesProps = {
  closeModal: () => void;
  data: DataBenefitType;
};

export const ReportPrivileges = ({ closeModal, data }: ReportPrivilegesProps) => {
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Báo cáo</h3>
      <div css={contentStyle}>
        <Row justify="space-between">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.nameBenifitsProposer" />
          </Col>
          <Col>{data.applicationUser?.fullName}</Col>
        </Row>
        <Row justify="space-between">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.baseSalary" />
          </Col>
          <Col>{data.monthlySalary}</Col>
        </Row>
        <Row justify="space-between">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.totalChangesTarget" />
          </Col>
          <Col>{data.targetSalary}</Col>
        </Row>

        <Row justify="space-between">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.actualSalaryFluctuates" />
          </Col>
          <Col>{data.totalSalary}</Col>
        </Row>

        <Row justify="space-between">
          <Col>
            <LocaleFormatter id="title.status" />
          </Col>
          <Col>{data.benefitStatus?.name}</Col>
        </Row>

        <Row justify="end">
          <Space css={reportFooter}>
            <Button onClick={() => closeModal}>Chia sẻ</Button>
            <Button type="primary" onClick={() => closeModal}>
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
