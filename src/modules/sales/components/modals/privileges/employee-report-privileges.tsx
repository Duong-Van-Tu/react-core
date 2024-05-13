/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment } from 'react';
import Dot from '@/assets/svg/dot.svg?react';

type EmployeeReportPrivilegesProps = {
  closeModal: () => void;
};
type FieldType = {
  criteria: string;
  objective: string;
  targetPoint: number;
  startDate: string;
  endDate: string;
  calculationMethod: string;
};

export const EmployeeReportPrivileges = ({ ...props }: EmployeeReportPrivilegesProps) => {
  const { closeModal } = props;

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    closeModal();
  };

  const oncancel = () => {
    closeModal();
  };
  return (
    <Fragment>
      <h3 css={TitleStyle}>Báo cáo</h3>
      <div css={contentEmployeeReportPrivileges}>
        <Row justify="space-between" css={rowStyle}>
          <Col span={12}>
            <p css={titleSemiBoldStyle}>Tên người đề xuất quyền lợi</p>
          </Col>
          <Col span={12}>
            <p css={titleValuetyle}>Tanner Finsha</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleBoldStyle}>Mức lương cố định hàng tháng</p>
          </Col>
          <Col>
            <p css={titleValuetyle}>1.000.000 VND</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleBoldStyle}>Tổng mức lương biến động mục tiêu</p>
          </Col>
          <Col>
            <p css={titleValuetyle}>1.000.000.000 VND</p>
          </Col>
        </Row>

        <Row justify="space-between" css={rowStyle}>
          <Col>
            <p css={titleBoldStyle}>Mức lương biến động mục tiêu thực tế</p>
          </Col>
          <Col>
            <p css={titleValuetyle}>1.000.000.000 VND</p>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col>
            <p css={titleSemiBoldStyle}>Trạng thái</p>
          </Col>
          <Col>
            <div css={statusStyle}>
              <Dot />
              <p>Chốt quyền lợi</p>
            </div>
          </Col>
        </Row>
      </div>

      <Button type="primary" onClick={onFinish} css={btnConfirmStyle}>
        Xác nhận
      </Button>
    </Fragment>
  );
};

const TitleStyle = css`
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.6rem;
  margin-top: 4rem;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  color: rgba(21, 41, 75, 1);
`;

const titleBoldStyle = css`
  color: rgba(16, 24, 40, 1);
  font-weight: 600;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;
const titleValuetyle = css`
  text-align: right;
  color: rgba(16, 24, 40, 1);
  font-weight: 600;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
`;

const titleSemiBoldStyle = css`
  text-align: left;
  color: rgba(66, 82, 109, 1);
  font-weight: 600;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
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
    font-family: 'Inter', sans-serif;
  }
`;

const btnConfirmStyle = css`
  display: inline-block;
  width: 100%;
  border-radius: 0.8rem;
  background: rgba(0, 112, 184, 1);
`;
