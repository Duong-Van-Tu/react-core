/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment } from 'react';
import { Button, Form, FormProps, Input, Row, Space } from 'antd';
import { useCustomer } from '@/modules/category/services/customer.service';
import { useWatchLoading } from '@/hooks/loading.hook';

type FieldType = {
  code: string;
  fullname: string;
};

type AddCustomerProps = {
  closeModal: () => void;
};

export const AddCustomer = ({ closeModal }: AddCustomerProps) => {
  const [form] = Form.useForm();
  const { addKCustomer } = useCustomer();
  const [loading] = useWatchLoading(['add-customer', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataAddCustomer = {
      ...values,
      code: values.code.toString(),
      fullname: values.fullname.toString(),
    };
    const add = await addKCustomer(dataAddCustomer);
    if (add) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Thêm khách hàng</h3>
      <Form
        form={form}
        css={formAddCustomertyle}
        name="add-customer"
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
