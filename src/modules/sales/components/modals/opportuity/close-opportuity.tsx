/** @jsxImportSource @emotion/react */
import { useLocale } from '@/hooks/locale.hook';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space, Select } from 'antd';
import { Fragment, useState } from 'react';
import { useOpportunityModal } from '.';

type FieldType = {
  customer: string;
  reason?: string;
};

export const CloseOpportuity = () => {
  const { closeModal } = useOpportunityModal();
  const { Option } = Select;
  const { formatMessage } = useLocale();
  const [showReasonInput, setShowReasonInput] = useState(false);

  const onStatusChange = (value: string) => {
    setShowReasonInput(value === 'Fail');
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    closeModal();
  };

  const oncancel = () => {
    closeModal();
  };
  return (
    <Fragment>
      <h3 css={formTitleStyle}>Đóng cơ hội</h3>
      <Form
        css={formCLoseOpportuityStyle}
        name="assign-opportuity"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>{formatMessage({ id: 'title.form.selectStatus' })}</span>
          }
          name="customer"
          rules={[
            { required: true, message: formatMessage({ id: 'form.input.require.selectStatus' }) },
          ]}
        >
          <Select
            placeholder={formatMessage({ id: 'title.form.selectStatus' })}
            onChange={onStatusChange}
            css={selectFormStyle}
            allowClear
          >
            <Option value="Activity">Đang active</Option>
            <Option value="Close">Close</Option>
            <Option value="Fail">Fail</Option>
            <Option value="Cancel">Cancel</Option>
            <Option value="Hold">On Hold</Option>
          </Select>
        </Form.Item>

        {showReasonInput && (
          <Form.Item<FieldType>
            label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.reason' })}</span>}
            name="reason"
            rules={[
              { required: true, message: formatMessage({ id: 'form.input.require.reason' }) },
            ]}
          >
            <Input.TextArea
              style={{ resize: 'none' }}
              placeholder={formatMessage({ id: 'form.input.reason' })}
              css={textAreaStyle}
            />
          </Form.Item>
        )}

        <Row justify="end">
          <Space>
            <Button onClick={oncancel}>Huỷ</Button>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Space>
        </Row>
      </Form>
    </Fragment>
  );
};

const formCLoseOpportuityStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
  padding: 1rem 0;
`;

const formTitleStyle = css`
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.6rem;
  margin-top: 3rem;
  color: rgba(21, 41, 75, 1);
  font-family: 'Roboto', sans-serif;
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  font-family: 'Roboto', sans-serif;
`;

const selectFormStyle = css`
  height: 4.5rem;
`;
const textAreaStyle = css`
  padding: 0.8rem 1.4rem;
  &::placeholder {
    color: rgba(208, 213, 221, 1);
    font-size: 1.4rem;
    font-family: Roboto, sans-serif;
    font-weight: 600;
  }
`;
