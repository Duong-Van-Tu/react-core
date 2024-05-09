/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { Link } from 'react-router-dom';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';

type FieldType = {
  email?: string;
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
      <div css={formContentStyle}>
        <CustomIcon type="logo" width={80} height={80} />
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
            label={<span css={labelFormItem}>{formatMessage({ id: 'form.auth.email' })}</span>}
            name="email"
            rules={[{ required: true, message: formatMessage({ id: 'form.input.require.email' }) }]}
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

          <Form.Item>
            <Button size="large" css={submitBtnStyle} type="primary" htmlType="submit">
              {formatMessage({ id: 'title.form.login' })}
            </Button>
          </Form.Item>
          <Link to="#" css={forgotPasswordLink}>
            Quên mật khẩu?
          </Link>
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
  min-width: 30rem;
`;

const loginTitleStyle = css`
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.6rem;
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
