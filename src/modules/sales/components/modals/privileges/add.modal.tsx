/** @jsxImportSource @emotion/react */
import { useLocale } from '@/hooks/locale.hook';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment } from 'react';

type FieldType = {
  beneficiaryName: string;
  baseSalary: string;
  totalSalaryVariation: string;
  variesActualSalary: string;
};

type AddPrivilegesProps = {
  closeModal?: () => void;
};

export const AddPrivileges = ({ closeModal }: AddPrivilegesProps) => {
  const { formatMessage } = useLocale();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    closeModal?.();
  };

  const oncancel = () => {
    closeModal?.();
  };

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Thêm đề xuất quyền lợi</h3>
      <Form css={formAddPrivilegeStyle} name="add-privileges" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.addPrivileges.beneficiaryName' })}
            </span>
          }
          name="beneficiaryName"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.input.addPrivileges.require.beneficiaryName' }),
            },
          ]}
        >
          <Input
            size="middle"
            placeholder={formatMessage({
              id: 'form.input.addPrivileges.placeholder.beneficiaryName',
            })}
            css={formInputItemStyle}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.addPrivileges.baseSalary' })}
            </span>
          }
          name="baseSalary"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.input.addPrivileges.require.baseSalary' }),
            },
          ]}
        >
          <Input
            size="middle"
            placeholder={formatMessage({ id: 'form.input.addPrivileges.placeholder.NETRevenue' })}
            css={formInputItemStyle}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.addPrivileges.totalSalaryVariation' })}
            </span>
          }
          name="totalSalaryVariation"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'form.input.addPrivileges.require.totalSalaryVariation',
              }),
            },
          ]}
        >
          <Input
            size="middle"
            placeholder={formatMessage({ id: 'form.input.addPrivileges.placeholder.NETRevenue' })}
            css={formInputItemStyle}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.addPrivileges.variesActualSalary' })}
            </span>
          }
          name="variesActualSalary"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'form.input.addPrivileges.require.variesActualSalary',
              }),
            },
          ]}
        >
          <Input
            size="middle"
            placeholder={formatMessage({ id: 'form.input.addPrivileges.placeholder.NETRevenue' })}
            css={formInputItemStyle}
          />
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

const formAddPrivilegeStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
  padding: 1rem;
`;

const formTitleStyle = css`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.2rem;
  margin-top: 2rem;
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
  color: #101828;
`;

const formInputItemStyle = css`
  height: 4.5rem;
  color: #101828;
  font-size: 1.4rem;
  font-weight: 500;
  &::placeholder {
    color: #d0d5dd;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
