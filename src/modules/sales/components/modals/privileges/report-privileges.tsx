/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Row } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { StatusBenefit } from '@/modules/sales/enum/status.enum';
import { Message } from '@/components/message';
import { currencyFormatter } from '@/utils/formatter';

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
          <Col>{currencyFormatter(data.monthlySalary as unknown as number)}</Col>
        </Row>
        <Row justify="space-between" align="bottom">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.totalChangesTarget" />
          </Col>
          <Col>{currencyFormatter(data.targetSalary as unknown as number)}</Col>
        </Row>

        <Row justify="space-between" align="bottom">
          <Col>
            <LocaleFormatter id="title.employee.reportPrivileges.actualSalaryFluctuates" />
          </Col>
          <Col>{currencyFormatter(data.totalSalary as unknown as number)}</Col>
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
