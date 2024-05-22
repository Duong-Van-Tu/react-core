/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Row, Space } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { StatusBenefit } from '@/modules/sales/enum/status.enum';
import { Message } from '@/components/message';

type ReportPrivilegesProps = {
  closeModal: () => void;
  data: DataBenefitType;
};

export const ReportPrivileges = ({ closeModal, data }: ReportPrivilegesProps) => {
  let messageType: MessageType;
  switch (data.benefitStatus?.code) {
    case StatusBenefit.Updated:
      messageType = 'success';
      break;
    case StatusBenefit.Request:
    case StatusBenefit.Confirm:
      messageType = 'info';
      break;
    default:
      messageType = 'warning';
  }

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Báo cáo</h3>
      <div css={contentStyle}>
        <Row justify="space-between" align="bottom">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.nameBenifitsProposer" />
          </Col>
          <Col>{data.applicationUser?.fullName}</Col>
        </Row>
        <Row justify="space-between" align="bottom">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.baseSalary" />
          </Col>
          <Col>{data.monthlySalary}</Col>
        </Row>
        <Row justify="space-between" align="bottom">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.totalChangesTarget" />
          </Col>
          <Col>{data.targetSalary}</Col>
        </Row>

        <Row justify="space-between" align="bottom">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.actualSalaryFluctuates" />
          </Col>
          <Col>{data.totalSalary}</Col>
        </Row>

        <Row justify="space-between" align="bottom">
          <Col>
            <LocaleFormatter id="title.status" />
          </Col>
          <Col>
            {data.benefitStatus ? (
              <Message hasBackground type={messageType}>
                {data.benefitStatus.name!}
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
  font-size: 2rem;
  line-height: 2.2rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const btnConfirmReport = css`
  width: 100%;
  margin-top: 2rem;
`;
