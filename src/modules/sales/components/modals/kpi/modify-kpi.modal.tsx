/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { Status } from '@/modules/sales/enum/status.enum';
import { useKPI } from '@/modules/sales/services/kpi.service';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment, useEffect } from 'react';

type FieldType = {
  objectiveProposer: string;
  criteria: string;
  targetKPI: string;
  targetPoint: number;
  calculate: string;
};

type ModifyKPIProps = {
  closeModal: () => void;
  data: DataKPIType;
};

export const ModifyKPI = ({ closeModal, data }: ModifyKPIProps) => {
  const { updateStatusKPI } = useKPI();
  const [form] = Form.useForm();
  const [loading] = useWatchLoading(['kpi-editStatus', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { targetKPI, targetPoint, calculate, criteria } = values;
    const dataUpdateKPI = {
      id: data.id,
      targetKPI: targetKPI.toString(),
      targetPoint: targetPoint.toString(),
      criteria,
      calculate,
      startTime: data.startTime,
      endTime: data.endTime,
      applicationUserId: data.userSuggest?.id,
      status: Status.Updated,
    } as DataKPIType;

    const editStatus = await updateStatusKPI(dataUpdateKPI);
    if (editStatus) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    form.setFieldsValue({
      objectiveProposer: `${data.userSuggest?.firstName} ${data.userSuggest?.lastName}`,
      ...data,
    });
  }, [data]);

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Điều chỉnh mục tiêu</h3>
      <Form form={form} css={formStyle} name="edit-kpi" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Người đề xuất mục tiêu</span>}
          name="objectiveProposer"
        >
          <Input size="large" disabled allowClear />
        </Form.Item>
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
              <Input size="large" placeholder="Nhập mục tiêu" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm mục tiêu</span>}
              name="targetPoint"
              rules={[{ required: true, message: 'Vui lòng nhập điểm mục tiêu!' }]}
            >
              <Input size="large" placeholder="Nhập điểm mục tiêu" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Cách tính</span>}
          name="calculate"
          rules={[{ required: true, message: 'Vui lòng nhập cách tính!' }]}
        >
          <Input size="large" placeholder="Nhập cách tính" allowClear />
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
