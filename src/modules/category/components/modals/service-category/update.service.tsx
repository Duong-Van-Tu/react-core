/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { Button, Form, FormProps, Input, Row, Space } from 'antd';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useService } from '@/modules/category/services/service-category.service';

type FieldType = {
  id?: string;
  code: string;
  name: string;
  shortName: string;
};

type UpdateServiceProps = {
  closeModal: () => void;
  data: DataServiceCategoryType;
};

export const UpdateService = ({ closeModal, data }: UpdateServiceProps) => {
  const [form] = Form.useForm();
  const { updateService } = useService();
  const [loading] = useWatchLoading(['edit-service', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateCustomer = {
      ...values,
      id: data.id,
    };
    const add = await updateService(dataUpdateCustomer);
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
      <h3 css={formTitleStyle}>Chỉnh sửa mảng dịch vụ</h3>
      <Form
        form={form}
        css={formUpdateServicetyle}
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

const formUpdateServicetyle = css`
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
