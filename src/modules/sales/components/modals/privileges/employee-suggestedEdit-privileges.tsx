/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment } from 'react';

type EmployeeSuggestedEditPrivilegesProps = {
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

export const EmployeeSuggestedEditPrivileges = ({
  ...props
}: EmployeeSuggestedEditPrivilegesProps) => {
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
      <h3 css={formTitleStyle}>Thêm đề xuất mục tiêu</h3>
      <Form css={formEditKPIStyle} name="edit-kpi" onFinish={onFinish} layout="vertical">
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
              <Input size="middle" placeholder="objective" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm mục tiêu</span>}
              name="targetPoint"
              rules={[{ required: true, message: 'Please input your targetPoint!' }]}
            >
              <Input size="middle" placeholder="targetPoint" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Ngầy bắt đầu mục tiêu</span>}
              name="startDate"
              rules={[{ required: true, message: 'Please input your startDate!' }]}
            >
              <Input size="middle" placeholder="startDate" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Thời gian kết thúc</span>}
              name="endDate"
              rules={[{ required: true, message: 'Please input your endDate!' }]}
            >
              <Input size="middle" placeholder="endDate" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Cách tính</span>}
          name="calculationMethod"
          rules={[{ required: true, message: 'Please input your calculationMethod!' }]}
        >
          <Input size="middle" placeholder="calculationMethod" />
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

const formEditKPIStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
  padding: 1rem;
`;

const formTitleStyle = css`
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.6rem;
  margin-top: 2rem;
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
`;
