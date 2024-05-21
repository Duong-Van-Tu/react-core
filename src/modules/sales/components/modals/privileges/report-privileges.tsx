/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Row } from 'antd';
import { Fragment } from 'react';
import Dot from '@/assets/svg/dot.svg?react';
import { useLocale } from '@/hooks/locale.hook';

type ReportPrivilegesProps = {
  closeModal: () => void;
};

export const ReportPrivileges = ({ closeModal }: ReportPrivilegesProps) => {
  const { formatMessage } = useLocale();

  return (
    <Fragment>
      <h3 css={TitleStyle}>Báo cáo</h3>
      <div css={contentEmployeeReportPrivileges}>
        <Row justify="space-between" css={rowStyle}>
          <Col span={12}>
            <p css={titleSemiBoldStyle}>
              {formatMessage({ id: 'title.employee.reportPrivileges.nameBenifitsProposer' })}
            </p>
          </Col>
          <Col span={12}>
            <p css={titleValuetyle}>Tanner Finsha</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleBoldStyle}>
              {formatMessage({ id: 'title.employee.reportPrivileges.baseSalary' })}
            </p>
          </Col>
          <Col>
            <p css={titleValuetyle}>1.000.000 VND</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleBoldStyle}>
              {formatMessage({ id: 'title.employee.reportPrivileges.totalChangesTarget' })}
            </p>
          </Col>
          <Col>
            <p css={titleValuetyle}>1.000.000.000 VND</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleBoldStyle}>
              {formatMessage({ id: 'title.employee.reportPrivileges.actualSalaryFluctuates' })}
            </p>
          </Col>
          <Col>
            <p css={titleValuetyle}>1.000.000.000 VND</p>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col>
            <p css={titleSemiBoldStyle}>{formatMessage({ id: 'title.status' })}</p>
          </Col>
          <Col>
            <div css={statusStyle}>
              <Dot />
              <p>Chốt quyền lợi</p>
            </div>
          </Col>
        </Row>
      </div>

      <Button type="primary" onClick={() => closeModal()} css={btnConfirmStyle}>
        Xác nhận
      </Button>
    </Fragment>
  );
};

const TitleStyle = css`
  font-weight: 500;
  font-size: 2.2rem;
  line-height: 2.4rem;
  margin-top: 4rem;
  text-align: center;
  color: rgba(21, 41, 75, 1);
`;

const titleBoldStyle = css`
  color: rgba(16, 24, 40, 1);
  font-weight: 500;
  font-size: 1.4rem;
`;
const titleValuetyle = css`
  text-align: right;
  color: rgba(16, 24, 40, 1);
  font-weight: 500;
  font-size: 1.4rem;
`;

const titleSemiBoldStyle = css`
  text-align: left;
  color: rgba(66, 82, 109, 1);
  font-weight: 500;
  font-size: 1.2rem;
`;

const rowStyle = css`
  margin-bottom: 1.5rem;
`;

const contentEmployeeReportPrivileges = css`
  margin: 3rem 0;
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
  }
`;

const btnConfirmStyle = css`
  display: inline-block;
  width: 100%;
  border-radius: 0.8rem;
  background: rgba(0, 112, 184, 1);
`;
