/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useKPI } from '@/modules/sales/services/kpi.service';
import { css } from '@emotion/react';
import { Button, Form, FormProps, Input, InputNumber, Row, Space } from 'antd';
import { Fragment, useEffect } from 'react';

type FieldType = {
  actualKPI: string;
  actualPoint: number;
};

type UpdateRequestProps = {
  closeModal: () => void;
  data: DataKPIType;
};

export const UpdateRequest = ({ closeModal, data }: UpdateRequestProps) => {
  const { updateKPI } = useKPI();
  const [form] = Form.useForm();
  const [loading] = useWatchLoading(['edit-status', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { actualKPI, actualPoint } = values;
    const dataUpdateKPI = {
      id: data.id,
      actualKPI: actualKPI.toString(),
      actualPoint: actualPoint.toString(),
    } as DataKPIType;

    const update = await updateKPI(dataUpdateKPI);
    if (update) {
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
      <h3 css={formTitleStyle}>Cập nhất kết quả</h3>
      <Form form={form} css={formStyle} name="edit-kpi" onFinish={onFinish} layout="vertical">
        <Form.Item label={<span css={labelFormItem}>Họ tên</span>}>
          <Input
            value={`${data.userSuggest?.firstName} ${data.userSuggest?.lastName}`}
            size="large"
            disabled
            allowClear
          />
        </Form.Item>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Thực tế</span>}
          name="actualKPI"
          rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}
        >
          <InputNumber css={inputStyle} size="large" placeholder="Nhập mục tiêu thực tế" />
        </Form.Item>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mục tiêu</span>}
          name="actualPoint"
          rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}
        >
          <InputNumber size="large" css={inputStyle} placeholder="Nhập điểm thực tế" />
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

const inputStyle = css`
  width: 100%;
`;
