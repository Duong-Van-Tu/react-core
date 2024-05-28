/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { Button, Form, FormProps, Input, Row, Space } from 'antd';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRelationshipLevel } from '@/modules/category/services/relationshipLevel.service';

type FieldType = {
  id?: string;
  code: string;
  description: string;
  pointFrom: string;
  pointTo: string;
};

type UpdateReltionshipLevelProps = {
  closeModal: () => void;
  data: DataReationshipLevelType;
};

export const UpdateReltionshipLevel = ({ closeModal, data }: UpdateReltionshipLevelProps) => {
  const [form] = Form.useForm();
  const { updateRelationshipLevel } = useRelationshipLevel();
  const [loading] = useWatchLoading(['edit-relationshipLevel', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateRelationshipLevel = {
      ...values,
      id: data.id,
      pointFrom: values.pointFrom.toString(),
      pointTo: values.pointTo.toString(),
    };
    const edit = await updateRelationshipLevel(dataUpdateRelationshipLevel);
    if (edit) {
      form.resetFields();
      closeModal();
    }
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const oncancel = () => {
    closeModal();
  };

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Chỉnh sửa mức độ quan hệ</h3>
      <Form
        form={form}
        css={formUpdateRelationshipLvtyle}
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

const formUpdateRelationshipLvtyle = css`
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
