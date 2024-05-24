/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { Button, Form, FormProps, Input, Row, Space } from 'antd';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useQuestionGain } from '@/modules/category/services/question-gain.service';

type FieldType = {
  id?: string;
  code: number;
  content: string;
  description: string;
};

type UpdateQuestionGainProps = {
  closeModal: () => void;
  data: DataQuestionGainsType;
};

export const UpdateQuestionGain = ({ closeModal, data }: UpdateQuestionGainProps) => {
  const [form] = Form.useForm();
  const { updateQuestionGain } = useQuestionGain();
  const [loading] = useWatchLoading(['add-questionGain', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateQuestionGain = {
      ...values,
      id: data.id,
      code: values.code.toString(),
    };
    const edit = await updateQuestionGain(dataUpdateQuestionGain);
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
      <h3 css={formTitleStyle}>Thêm câu hỏi bằng GAIN</h3>
      <Form
        form={form}
        css={formUpdateQuestionGainStyle}
        name="add-questionGain"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Số thứ tự</span>}
          name="code"
          rules={[{ required: false, message: 'Vui lòng nhập số thứ tự!' }]}
        >
          <Input placeholder="Nhập số thứ tự" disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Câu hỏi</span>}
          name="content"
          rules={[{ required: true, message: 'Vui lòng nhập câu hỏi!' }]}
        >
          <Input placeholder="Nhập tên câu hỏi" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mô tả</span>}
          name="description"
          rules={[{ required: false, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input placeholder="Nhập mô tả" />
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

const formUpdateQuestionGainStyle = css`
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
