/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useSupplier } from '@/modules/category/services/supplier.service';

type FieldType = {
  id?: string;
  code: string;
  name: string;
  description: string;
  review: string;
};

type UpdateSupplierProps = {
  closeModal: () => void;
  data: DataSupplierType;
};

export const UpdateSupplier = ({ closeModal, data }: UpdateSupplierProps) => {
  const [form] = Form.useForm();
  const { updateSupplier } = useSupplier();
  const [loading] = useWatchLoading(['edit-supplier', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateSupplier = {
      ...values,
      id: data.id,
    };
    const add = await updateSupplier(dataUpdateSupplier);
    if (add) {
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
      <h3 css={formTitleStyle}>Chỉnh sửa nhà cung cấp</h3>
      <Form
        form={form}
        css={formAddCustomertyle}
        name="add-supplier"
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mã NCC</span>}
              name="code"
              rules={[{ required: true, message: 'Vui lòng nhập mã NCC!' }]}
            >
              <Input placeholder="Nhập mã NCC" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Tên NCC</span>}
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên NCC!' }]}
            >
              <Input placeholder="Nhập tên NCC" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mô tả</span>}
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Đánh giá</span>}
          name="review"
          rules={[{ required: true, message: 'Vui lòng nhập đánh giá!' }]}
        >
          <Input.TextArea placeholder="Nhập đánh giá" />
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

const formTitleStyle = css`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.2rem;
  margin-top: 2rem;
`;

const formAddCustomertyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
  padding: 1rem;
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
`;
