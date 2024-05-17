/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useKPI } from '@/modules/sales/services/kpi.service';
import { css } from '@emotion/react';
import { Button, Col, DatePicker, Form, FormProps, Input, InputNumber, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { Fragment } from 'react';

type FieldType = {
  criteria: string;
  targetKPI: number;
  targetPoint: number;
  startTime: string;
  endTime: string;
  calculate: string;
};

type AddKPIProps = {
  closeModal: () => void;
};

export const AddKPI = ({ closeModal }: AddKPIProps) => {
  const { addKPI } = useKPI();
  const [form] = Form.useForm();
  const [loading] = useWatchLoading(['add-kpi', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataAddKPI = {
      ...values,
      targetKPI: values.targetKPI.toString(),
      targetPoint: values.targetPoint.toString(),
      startTime: dayjs(values.startTime).format('DD/MM/YYYY'),
      endTime: dayjs(values.endTime).format('DD/MM/YYYY'),
    };
    const add = await addKPI(dataAddKPI);
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
      <h3 css={formTitleStyle}>Thêm đề xuất mục tiêu</h3>
      <Form form={form} css={formEditKPIStyle} name="add-kpi" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tiêu chí</span>}
          name="criteria"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu chí!' }]}
        >
          <Input.TextArea placeholder="Nhập tiêu chí" allowClear />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mục tiêu</span>}
              name="targetKPI"
              rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}
            >
              <InputNumber css={inputStyle} size="middle" placeholder="Nhập mục tiêu" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm mục tiêu</span>}
              name="targetPoint"
              rules={[{ required: true, message: 'Vui lòng nhập điểm mục tiêu!' }]}
            >
              <InputNumber css={inputStyle} size="middle" placeholder="Nhập điểm mục tiêu" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Ngày bắt đầu mục tiêu</span>}
              name="startTime"
              rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu mục tiêu!' }]}
            >
              <DatePicker css={inputStyle} placeholder="Nhập ngày bắt đầu mục tiêu" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Thời gian kết thúc</span>}
              name="endTime"
              rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc!' }]}
            >
              <DatePicker css={inputStyle} placeholder="Nhập thời gian kết thúc" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Cách tính</span>}
          name="calculate"
          rules={[{ required: true, message: 'Vui lòng nhập cách tính!' }]}
        >
          <Input.TextArea placeholder="Nhập cách tính" allowClear />
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

const formEditKPIStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
  padding: 1rem;
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
