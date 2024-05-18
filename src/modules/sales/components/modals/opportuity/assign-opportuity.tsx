/** @jsxImportSource @emotion/react */
import { useLocale } from '@/hooks/locale.hook';
import { css } from '@emotion/react';
import { Button, Form, FormProps, Row, Space, Select } from 'antd';
import { Fragment } from 'react';

type AssignOpportuityProps = {
  closeModal: () => void;
};
type FieldType = {
  customer: string;
};

export const AssignOpportuity = ({ ...props }: AssignOpportuityProps) => {
  const { closeModal } = props;
  const { Option } = Select;
  const { formatMessage } = useLocale();

  const onCustomerChange = () => {};

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    closeModal();
  };

  const oncancel = () => {
    closeModal();
  };
  return (
    <Fragment>
      <h3 css={formTitleStyle}>Gán cơ hội cho Sale/NPP</h3>
      <Form
        css={formAssignOpportuityStyle}
        name="assign-opportuity"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.select' })}</span>}
          name="customer"
          rules={[
            { required: true, message: formatMessage({ id: 'form.input.require.selectCustomer' }) },
          ]}
        >
          <Select
            placeholder={formatMessage({ id: 'title.form.selectCustomer' })}
            onChange={onCustomerChange}
            css={selectFormStyle}
            allowClear
          >
            <Option value="test">test</Option>
          </Select>
        </Form.Item>

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

const formAssignOpportuityStyle = css`
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
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
`;

const selectFormStyle = css`
  height: 4.5rem;
`;
