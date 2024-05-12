/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { Link } from 'react-router-dom';

type FieldType = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const { formatMessage } = useLocale();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div css={formContainerStyle}>
      <div css={formContentStyle}>
        <div css={goBackStyle}>
          <CustomIcon width={12} height={14} type="prev" />
          <Link css={goBackLinkStyle} to="/auth/email-verification">
            {formatMessage({ id: 'title.back' })}
          </Link>
        </div>
        <h3 css={resetPasswordTitleStyle}>{formatMessage({ id: 'title.form.resetPassword' })}</h3>
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
            label={
              <span css={labelFormItem}>{formatMessage({ id: 'form.auth.newPassword' })}</span>
            }
            name="password"
            rules={[
              { required: true, message: formatMessage({ id: 'form.input.require.newPassword' }) },
            ]}
          >
            <Input.Password
              size="large"
              placeholder={formatMessage({ id: 'form.auth.newPasswordConfirm' })}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label={
              <span css={labelFormItem}>
                {formatMessage({ id: 'form.auth.newPasswordConfirm' })}
              </span>
            }
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'form.input.require.newPasswordConfirm' }),
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder={formatMessage({ id: 'form.auth.newPasswordConfirm' })}
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" css={submitBtnStyle} type="primary" htmlType="submit">
              {formatMessage({ id: 'form.action.update' })}
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

const resetPasswordTitleStyle = css`
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
