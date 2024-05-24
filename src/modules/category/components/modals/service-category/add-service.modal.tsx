/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment } from 'react';
import { Button, Form, FormProps, Input, Row, Space } from 'antd';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useService } from '@/modules/category/services/service-category.service';

type FieldType = {
  code: string;
  name: string;
  shortName: string;
};

type AddServiceProps = {
  closeModal: () => void;
};

export const AddService = ({ closeModal }: AddServiceProps) => {
  const [form] = Form.useForm();
  const { addKService } = useService();
  const [loading] = useWatchLoading(['add-service', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataAddCustomer = {
      ...values,
    };
    const add = await addKService(dataAddCustomer);
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
      <h3 css={formTitleStyle}>Thêm mảng dịch vụ</h3>
      <Form
        form={form}
        css={formAddServicetyle}
        name="add-service"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mã mảng DV</span>}
          name="code"
          rules={[{ required: true, message: 'Vui lòng nhập mảng DV!' }]}
        >
          <Input placeholder="Nhập mã mảng DV" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tên mảng DV</span>}
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên mảng DV!' }]}
        >
          <Input placeholder="Nhập tên mảng DV" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tên viết tắt</span>}
          name="shortName"
          rules={[{ required: true, message: 'Vui lòng nhập tên viết tắt!' }]}
        >
          <Input placeholder="Nhập tên viết tắt" />
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

const formAddServicetyle = css`
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
