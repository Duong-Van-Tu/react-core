/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { Link } from 'react-router-dom';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { useAuth } from '@/hooks/auth.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useWatchMessage } from '@/hooks/message.hook';
import { Message } from '@/components/message';
import { Fragment } from 'react';

type FieldType = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { formatMessage } = useLocale();
  const { login } = useAuth();
  const [loading] = useWatchLoading(['login-loading', false]);
  const { errors } = useWatchMessage('login-message');

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { username, password } = values;
    login(username, password);
  };

  return (
    <Fragment>
      <div css={formContainerStyle}>
        <div css={formContentStyle}>
          <CustomIcon type="logo" width={90} height={90} />
          <h3 css={loginTitleStyle}>{formatMessage({ id: 'title.form.login' })}</h3>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            css={formStyle}
          >
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>{formatMessage({ id: 'form.auth.username' })}</span>}
              name="username"
              rules={[
                { required: true, message: formatMessage({ id: 'form.input.require.username' }) },
              ]}
            >
              <Input size="large" autoComplete="email" />
            </Form.Item>

            <Form.Item<FieldType>
              label={<span css={labelFormItem}>{formatMessage({ id: 'form.auth.password' })}</span>}
              name="password"
              rules={[
                { required: true, message: formatMessage({ id: 'form.input.require.password' }) },
              ]}
            >
              <Input.Password size="large" autoComplete="current-password" />
            </Form.Item>
            <Message type="error">{errors[0]}</Message>
            <Form.Item>
              <Button
                loading={loading}
                size="large"
                css={submitBtnStyle}
                type="primary"
                htmlType="submit"
              >
                {formatMessage({ id: 'title.form.login' })}
              </Button>
            </Form.Item>
            <Link to="/auth/forgot-password" css={forgotPasswordLink}>
              {formatMessage({ id: 'title.form.forgotPassword' })}
            </Link>
          </Form>
        </div>
      </div>
    </Fragment>
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
  min-width: 34rem;
`;

const loginTitleStyle = css`
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.8rem;
  margin-top: 2rem;
`;

const forgotPasswordLink = css`
  width: 100%;
  display: block;
  text-align: center;
  color: #0070b8;
  &:hover {
    color: #0070b8;
    opacity: 0.85;
  }
`;
