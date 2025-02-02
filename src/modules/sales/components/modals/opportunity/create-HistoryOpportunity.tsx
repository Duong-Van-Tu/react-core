/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useLocale } from '@/hooks/locale.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useOpportunity } from '@/modules/sales/services/opportunity.service';
import { css } from '@emotion/react';
import { Button, Col, DatePicker, Form, FormProps, Input, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { Fragment } from 'react';

type FieldType = {
  goal: string;
  activity: string;
  time: string;
  result: string;
};

type CreateHistoryOpportunityProps = {
  closeModal: () => void;
  data: DataOpportunityType;
};

export const CreateHistoryOpportunity = ({ closeModal, data }: CreateHistoryOpportunityProps) => {
  const { addHistoryOpportunity } = useOpportunity();
  const { formatMessage } = useLocale();
  const [form] = Form.useForm();
  const user = useRootSelector((state) => state.auth.user);
  const [loading] = useWatchLoading(['add-historyOpportunity', false]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { goal, time } = values;
    const dataAddHistoryOpportunity = {
      ...values,
      time: dayjs(time).format('DD/MM/YYYY'),
      goal: goal.toString(),
      opportunityId: data.id,
      applicationUserId: user?.id,
    } as HistoryOpportunityType;

    const add = await addHistoryOpportunity(dataAddHistoryOpportunity);
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
      <h3 css={formStyle}>Thêm cập nhật cơ hội</h3>
      <Form
        form={form}
        css={formEditOpportunityStyle}
        name="add-historyOpportunity"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.target' })}</span>}
          name="goal"
          rules={[{ required: true, message: formatMessage({ id: 'form.input.require.target' }) }]}
        >
          <Input size="large" placeholder={formatMessage({ id: 'form.input.target' })} />
        </Form.Item>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.activity' })}</span>}
          name="activity"
          rules={[
            { required: true, message: formatMessage({ id: 'form.input.require.activity' }) },
          ]}
        >
          <Input.TextArea placeholder={formatMessage({ id: 'form.input.activity' })} allowClear />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.time' })}</span>}
              name="time"
              rules={[
                { required: true, message: formatMessage({ id: 'form.input.require.time' }) },
              ]}
            >
              <DatePicker
                size="large"
                css={inputStyle}
                format={['DD/MM/YYYY']}
                placeholder="Nhập thời điểm"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.result' })}</span>}
              name="result"
              rules={[
                { required: true, message: formatMessage({ id: 'form.input.require.result' }) },
              ]}
            >
              <Input css={inputStyle} size="large" placeholder="Nhập kết quả" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" css={formFooterStyle}>
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

const formEditOpportunityStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
  padding: 1rem;
`;

const formStyle = css`
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

const formFooterStyle = css`
  margin-top: 1rem;
`;
