/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Checkbox, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useLocale } from '@/hooks/locale.hook';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export default function LoginPage() {
  const { formatMessage } = useLocale();
  return (
    <div css={formContainerStyle}>
      <h3 css={loginTitleStyle}>{formatMessage({ id: 'title.form.login' })}</h3>
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
          label={formatMessage({ id: 'form.auth.username' })}
          name="username"
          rules={[
            { required: true, message: formatMessage({ id: 'form.input.require.username' }) },
          ]}
        >
          <Input size="large" autoComplete="username" />
        </Form.Item>

        <Form.Item<FieldType>
          label={formatMessage({ id: 'form.auth.password' })}
          name="password"
          rules={[
            { required: true, message: formatMessage({ id: 'form.input.require.password' }) },
          ]}
        >
          <Input.Password size="large" autoComplete="current-password" />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked">
          <Checkbox>{formatMessage({ id: 'form.auth.rememberMe' })}</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button size="large" css={submitBtnStyle} type="primary" htmlType="submit">
            {formatMessage({ id: 'title.form.login' })}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const formContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const submitBtnStyle = css`
  width: 100%;
`;

const formStyle = css`
  min-width: 30rem;
  margin-top: 3rem;
`;

const loginTitleStyle = css`
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.6rem;
`;
