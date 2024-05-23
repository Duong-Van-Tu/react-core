/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment } from 'react';
import { Button, Form, FormProps, Input, Row, Space } from 'antd';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRelationshipLv } from '@/modules/category/services/relationshipLv.service';

type FieldType = {
  code: string;
  description: string;
  pointFrom: number;
  pointTo: number;
};

type AddReltionshipLvProps = {
  closeModal: () => void;
};

export const AddReltionshipLv = ({ closeModal }: AddReltionshipLvProps) => {
  const [form] = Form.useForm();
  const { addKRelationshipLv } = useRelationshipLv();
  const [loading] = useWatchLoading(['add-customer', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataAddCustomer = {
      ...values,
    };
    const add = await addKRelationshipLv(dataAddCustomer);
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
      <h3 css={formTitleStyle}>Thêm mức độ quan hệ</h3>
      <Form
        form={form}
        css={formAddRelationshipLvtyle}
        name="add-customer"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mức độ quan hệ</span>}
          name="code"
          rules={[{ required: true, message: 'Vui lòng nhập mức độ quan hệ!' }]}
        >
          <Input placeholder="Nhập mức độ quan hệ" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Định nghĩa</span>}
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập định nghĩa!' }]}
        >
          <Input placeholder="Nhập định nghĩa" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Điểm bắt đầu</span>}
          name="pointFrom"
          rules={[{ required: true, message: 'Vui lòng nhập điểm bắt đầu!' }]}
        >
          <Input placeholder="Nhập điểm bắt đầu" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Điểm kết thúc</span>}
          name="pointTo"
          rules={[{ required: true, message: 'Vui lòng nhập điểm kết thúc!' }]}
        >
          <Input placeholder="Nhập điểm kết thúc" />
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

const formAddRelationshipLvtyle = css`
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
