/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';

type FieldType = {
  email?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function ForgotPasswordPage() {
  const { formatMessage } = useLocale();
  return (
    <div css={formContainerStyle}>
      <div css={formContentStyle}>
        <CustomIcon type="logo" width={90} height={90} />
        <h3 css={loginTitleStyle}>{formatMessage({ id: 'title.form.forgotPassword' })}</h3>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          css={formStyle}
        >
          <Form.Item<FieldType>
            label={<span css={labelFormItem}>{formatMessage({ id: 'form.auth.email' })}</span>}
            name="email"
            rules={[{ required: true, message: formatMessage({ id: 'form.input.require.email' }) }]}
          >
            <Input size="large" autoComplete="email" />
          </Form.Item>

          <Form.Item>
            <Button size="large" css={submitBtnStyle} type="primary" htmlType="submit">
              {formatMessage({ id: 'title.form.forgotPassword' })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const formContainerStyle = css`
  display: flex;
  justify-content: center;
`;

const formContentStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.8rem;
  padding: 2rem;
  box-shadow: 0.04px 0.1px 6px #d9dadb;
  background: #fff;
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
`;

const submitBtnStyle = css`
  margin-top: 2rem;
  width: 100%;
  background: #0070b8;

  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const formStyle = css`
  margin-top: 2rem;
  min-width: 40rem;
`;

const loginTitleStyle = css`
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.6rem;
  margin-top: 2rem;
`;
