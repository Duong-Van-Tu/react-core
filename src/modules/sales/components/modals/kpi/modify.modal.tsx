/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment } from 'react';

type FieldType = {
  objectiveProposer: string;
  criteria: string;
  objective: string;
  targetPoint: number;
  startDate: string;
  endDate: string;
  calculationMethod: string;
};

type ModifyKPIProps = {
  closeModal?: () => void;
};

export const ModifyKPI = ({ closeModal }: ModifyKPIProps) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    closeModal?.();
  };

  const oncancel = () => {
    closeModal?.();
  };

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Điều chỉnh mục tiêu</h3>
      <Form css={formStyle} name="edit-kpi" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Người đề xuất mục tiêu</span>}
          name="objectiveProposer"
        >
          <Input size="large" placeholder="Dương Văn Tú" disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tiêu chí</span>}
          name="criteria"
          rules={[{ required: true, message: 'Please input your criteria!' }]}
        >
          <Input.TextArea placeholder="Criteria" />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mục tiêu</span>}
              name="objective"
              rules={[{ required: true, message: 'Please input your objective!' }]}
            >
              <Input size="large" placeholder="objective" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm mục tiêu</span>}
              name="targetPoint"
              rules={[{ required: true, message: 'Please input your targetPoint!' }]}
            >
              <Input size="large" placeholder="targetPoint" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Cách tính</span>}
          name="calculationMethod"
          rules={[{ required: true, message: 'Please input your calculationMethod!' }]}
        >
          <Input size="large" placeholder="calculationMethod" />
        </Form.Item>
        <Row justify="end">
          <Space>
            <Button onClick={oncancel}>Huỷ</Button>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Space>
        </Row>
      </Form>
    </Fragment>
  );
};

const formStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
`;

const formTitleStyle = css`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.2rem;
  margin-top: 2rem;
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
`;
