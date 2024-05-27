/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useLocale } from '@/hooks/locale.hook';
import { useBenefit } from '@/modules/sales/services/benefit.service';
import { css } from '@emotion/react';
import { Button, Form, FormProps, Input, InputNumber, Row, Space } from 'antd';
import { Fragment, useEffect } from 'react';

type FieldType = {
  applicationUserId: string;
  monthlySalary: string;
  targetSalary: string;
  totalSalary: string;
  totalBenefit: string;
};

type EditPrivilegesProps = {
  closeModal: () => void;
  data: DataBenefitType;
};

export const EditPrivileges = ({ closeModal, data }: EditPrivilegesProps) => {
  const { formatMessage } = useLocale();
  const { getUsersBenefit, updateBenefit } = useBenefit();
  const [loading] = useWatchLoading(['edit-benefit', false]);
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { monthlySalary, targetSalary, totalSalary, totalBenefit } = values;
    const dataUpdateBenefit = {
      id: data.id,
      applicationUserId: data.applicationUser?.id,
      monthlySalary: monthlySalary.toString(),
      targetSalary: targetSalary.toString(),
      totalSalary: totalSalary.toString(),
      totalBenefit: totalBenefit.toString(),
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
        >
          <Input value={data.applicationUser?.fullName} disabled size="large" />
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
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tổng quyền lợi hiện tại</span>}
          name="totalBenefit"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tổng quyền lợi hiện tại! ',
            },
          ]}
        >
          <InputNumber css={inputStyle} size="large" placeholder="Nhập tổng quyền lợi hiện tại" />
        </Form.Item>

        <Row justify="end">
          <Space>
            <Button onClick={oncancel}>Huỷ</Button>
            <Button loading={loading} type="primary" htmlType="submit">
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
