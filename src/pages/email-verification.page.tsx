/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import type { FormProps, GetProp } from 'antd';
import type { OTPProps } from 'antd/es/input/OTP';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';
import { LocaleFormatter } from '@/components/locale-formatter';

type FieldType = {
  otp?: string;
};

export default function EmailVerificationPage() {
  const { formatMessage } = useLocale();
  const navigate = useNavigate();

  const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
    console.log('onChange:', text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    navigate('/reset-password');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div css={formContainerStyle}>
      <div css={formContentStyle}>
        <div css={goBackStyle}>
          <CustomIcon width={12} height={14} type="prev" />
          <Link css={goBackLinkStyle} to="/forgot-password">
            {formatMessage({ id: 'title.back' })}
          </Link>
        </div>
        <h3 css={loginTitleStyle}>{formatMessage({ id: 'title.form.emailVerification' })}</h3>
        <LocaleFormatter id="description.auth.emailVerification" email="tu@gmail.com" />
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
            name="otp"
            rules={[{ required: true, message: formatMessage({ id: 'form.input.require.otp' }) }]}
          >
            <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
          </Form.Item>
          <Button css={resendCodeBtn}>{formatMessage({ id: 'form.input.auth.resendCode' })}</Button>
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
  max-width: 34rem;
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
  margin-top: 4rem;
  width: 100%;
  .ant-otp {
    width: 100%;
    gap: 1.2rem;
    input {
      padding: 1rem;
    }
  }
`;

const loginTitleStyle = css`
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.6rem;
  margin: 2rem 0;
`;

const goBackStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
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

const resendCodeBtn = css`
  background: none;
  border: none;
  padding: 0;
  box-shadow: none;
  color: #0070b8;
`;
