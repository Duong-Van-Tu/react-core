/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
  email?: string;
};

export default function ForgotPasswordPage() {
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    navigate('/auth/email-verification');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div css={formContainerStyle}>
      <div css={formContentStyle}>
        <div css={goBackStyle}>
          <CustomIcon width={12} height={14} type="prev" />
          <Link css={goBackLinkStyle} to="/auth/login">
            {formatMessage({ id: 'title.back' })}
          </Link>
        </div>
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
            <Input
              size="large"
              autoComplete="email"
              placeholder={formatMessage({ id: 'form.auth.email' })}
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" css={submitBtnStyle} type="primary" htmlType="submit">
              {formatMessage({ id: 'title.continue' })}
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
  min-width: 34rem;
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
  width: 100%;
`;

const loginTitleStyle = css`
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.6rem;
  margin-top: 2rem;
`;

const goBackStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  gap: 0.3rem;
  &:hover {
    svg {
      path {
        fill: #1677ff;
      }
    }
  }
`;

const goBackLinkStyle = css`
  font-size: 1.4rem;
  color: #000;
`;
