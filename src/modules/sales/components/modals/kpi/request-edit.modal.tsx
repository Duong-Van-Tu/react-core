/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment } from 'react';

type FieldType = {
  currentObjectiveEndTime: string;
  currentObjective: string;
  currentObjectivePoint: string;
  editTargetEndTime: string;
  targetEditing: string;
  targetPointEditing: string;
};

type RequestEditProps = {
  closeModal?: () => void;
};

export const RequestEdit = ({ closeModal }: RequestEditProps) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    closeModal?.();
  };

  const oncancel = () => {
    closeModal?.();
  };

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Đề xuất chỉnh sửa mục tiêu</h3>
      <Form css={formStyle} name="edit-kpi" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Thời gian kết thúc mục tiêu hiện tại</span>}
          name="currentObjectiveEndTime"
        >
          <Input size="large" placeholder="01/06/2024" disabled />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mục tiêu hiện tại</span>}
              name="currentObjective"
            >
              <Input size="large" placeholder="100" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm Mục tiêu hiên tại</span>}
              name="currentObjectivePoint"
            >
              <Input size="large" placeholder="200" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Thơi gian kết thúc mục tiêu muốn chỉnh sửa</span>}
          name="editTargetEndTime"
          rules={[{ required: true, message: 'Please input your editTargetEndTime!' }]}
        >
          <Input size="large" placeholder="01/10/2024" />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mục tiêu muốn chỉnh sửa</span>}
              name="targetEditing"
              rules={[{ required: true, message: 'Please input your targetEditing!' }]}
            >
              <Input size="large" placeholder="targetEditing" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm mục tiêu muốn chỉnh sửa</span>}
              name="targetPointEditing"
              rules={[{ required: true, message: 'Please input your targetPointEditing!' }]}
            >
              <Input size="large" placeholder="targetPointEditing" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Space>
            <Button onClick={oncancel}>Huỷ</Button>
            <Button ghost type="primary" onClick={oncancel}>
              Từ chối chỉnh sửa
            </Button>
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
  padding: 1rem 0;
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
