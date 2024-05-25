/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useKPI } from '@/modules/sales/services/kpi.service';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment, useEffect } from 'react';

type FieldType = {
  id?: string;
  criteria: string;
  targetKPI: string;
  targetPoint: number;
  calculate: string;
};

type EditKPIProps = {
  closeModal: () => void;
  data: DataKPIType;
};

export const EditKPI = ({ closeModal, data }: EditKPIProps) => {
  const { updateKPI } = useKPI();
  const [form] = Form.useForm();
  const [loading] = useWatchLoading(['edit-kpi', false]);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateKPI = {
      ...values,
      id: data.id,
      targetKPI: values.targetKPI.toString(),
      targetPoint: values.targetPoint.toString(),
    };

    const edit = await updateKPI(dataUpdateKPI);
    if (edit) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Chỉnh sửa mục tiêu</h3>
      <Form form={form} css={formStyle} name="edit-kpi" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tiêu chí</span>}
          name="criteria"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu chí!' }]}
        >
          <Input.TextArea size="large" placeholder="Nhập tiêu chí" />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mục tiêu</span>}
              name="targetKPI"
              rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}
            >
              <Input size="large" placeholder="Nhập mục tiêu" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm mục tiêu</span>}
              name="targetPoint"
              rules={[{ required: true, message: 'Vui lòng nhập điểm mục tiêu!' }]}
            >
              <Input size="large" placeholder="Nhập điểm mục tiêu" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Cách tính</span>}
          name="calculate"
          rules={[{ required: true, message: 'Vui lòng nhập cách tính!' }]}
        >
          <Input.TextArea
            size="large"
            placeholder="Nếu vượt mục tiêu 1 khách hàng + 100 cho mỗi khách hàng. Nếu thiếu 1 khách hàng thì - 100 điểm"
          />
        </Form.Item>

        <Row justify="end">
          <Space>
            <Button onClick={oncancel}>Huỷ</Button>
            <Button loading={loading} type="primary" htmlType="submit">
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
