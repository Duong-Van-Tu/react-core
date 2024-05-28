/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { Button, Form, FormProps, Input, Row, Space } from 'antd';
import { useCustomer } from '@/modules/category/services/customer.service';
import { useWatchLoading } from '@/hooks/loading.hook';

type FieldType = {
  id?: string;
  code: string;
  fullname: string;
};

type UptdaeCustomerProps = {
  closeModal: () => void;
  data: DataCustomerType;
};

export const UpdateCustomer = ({ closeModal, data }: UptdaeCustomerProps) => {
  const [form] = Form.useForm();
  const { updateCustomer } = useCustomer();
  const [loading] = useWatchLoading(['edit-customer', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateCustomer = {
      ...values,
      id: data.id,
    };

    const edit = await updateCustomer(dataUpdateCustomer);
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
      <h3 css={formTitleStyle}>Chỉnh sửa khách hàng</h3>
      <Form
        form={form}
        css={formUpdateCustomertyle}
        name="add-kpi"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mã KH</span>}
          name="code"
          rules={[{ required: true, message: 'Vui lòng nhập mã KH!' }]}
        >
          <Input placeholder="Nhập mã KH" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tên khách hàng</span>}
          name="fullname"
          rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
        >
          <Input placeholder="Nhập tên khách hàng" />
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

const formUpdateCustomertyle = css`
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
