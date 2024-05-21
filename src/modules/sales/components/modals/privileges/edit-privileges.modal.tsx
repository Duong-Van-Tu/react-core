/** @jsxImportSource @emotion/react */
import { useLocale } from '@/hooks/locale.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useBenefit } from '@/modules/sales/services/benefit.service';
import { css } from '@emotion/react';
import { Button, Form, FormProps, InputNumber, Row, Select, Space } from 'antd';
import { Fragment, useEffect, useMemo } from 'react';

type FieldType = {
  applicationUserId: string;
  monthlySalary: string;
  targetSalary: string;
  totalSalary: string;
};

type AddPrivilegesProps = {
  closeModal: () => void;
  data: DataBenefitType;
};

export const EditPrivileges = ({ closeModal, data }: AddPrivilegesProps) => {
  const { formatMessage } = useLocale();
  const { getUsersBenefit, updateBenefit } = useBenefit();
  const [form] = Form.useForm();
  const users = useRootSelector((state) => state.sale.benefit.users);

  const userOptions =
    useMemo(
      () =>
        users?.map((user) => ({
          value: user.id,
          label: user.fullName,
        })),
      [users],
    ) ?? [];

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { monthlySalary, targetSalary, totalSalary } = values;
    const dataUpdateBenefit = {
      id: data.id,
      ...values,
      monthlySalary: monthlySalary.toString(),
      targetSalary: targetSalary.toString(),
      totalSalary: totalSalary.toString(),
    };
    const edit = await updateBenefit(dataUpdateBenefit);
    if (edit) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    getUsersBenefit();
  }, [getUsersBenefit]);

  useEffect(() => {
    form.setFieldsValue({ ...data, applicationUserId: data.applicationUser?.fullName });
  }, [data]);

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Chỉnh sửa quyền lợi</h3>
      <Form form={form} css={formStyle} name="add-privileges" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.addPrivileges.beneficiaryName' })}
            </span>
          }
          name="applicationUserId"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.input.addPrivileges.require.beneficiaryName' }),
            },
          ]}
        >
          <Select size="large" placeholder="Người hưởng quyền lợi" options={userOptions} />
        </Form.Item>

        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.addPrivileges.baseSalary' })}
            </span>
          }
          name="monthlySalary"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'form.input.addPrivileges.require.baseSalary' }),
            },
          ]}
        >
          <InputNumber
            css={inputStyle}
            size="large"
            placeholder={formatMessage({ id: 'form.input.addPrivileges.placeholder.NETRevenue' })}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.addPrivileges.totalSalaryVariation' })}
            </span>
          }
          name="targetSalary"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'form.input.addPrivileges.require.totalSalaryVariation',
              }),
            },
          ]}
        >
          <InputNumber
            css={inputStyle}
            size="large"
            placeholder={formatMessage({ id: 'form.input.addPrivileges.placeholder.NETRevenue' })}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.addPrivileges.variesActualSalary' })}
            </span>
          }
          name="totalSalary"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'form.input.addPrivileges.require.variesActualSalary',
              }),
            },
          ]}
        >
          <InputNumber
            css={inputStyle}
            size="large"
            placeholder={formatMessage({ id: 'form.input.addPrivileges.placeholder.NETRevenue' })}
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

const formStyle = css`
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

const inputStyle = css`
  width: 100%;
`;
