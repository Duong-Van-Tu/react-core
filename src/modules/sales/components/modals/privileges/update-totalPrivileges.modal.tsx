/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useLocale } from '@/hooks/locale.hook';
import { useBenefit } from '@/modules/sales/services/benefit.service';
import { css } from '@emotion/react';
import { Button, Form, FormProps, Input, InputNumber, Row, Space } from 'antd';
import { Fragment, useEffect } from 'react';

type FieldType = {
  applicationUserId: string;
  totalBenefit: string;
};

type UpdateTotalPrivilegesProps = {
  closeModal: () => void;
  data: DataBenefitType;
};

export const UpdateTotalPrivileges = ({ closeModal, data }: UpdateTotalPrivilegesProps) => {
  const { formatMessage } = useLocale();
  const { updateTotalBenefit } = useBenefit();
  const [loading] = useWatchLoading(['edit-totalBenefit', false]);
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { totalBenefit } = values;
    const dataUpdateBenefit = {
      id: data.id,
      totalBenefit: totalBenefit.toString(),
    };
    const edit = await updateTotalBenefit(dataUpdateBenefit);
    if (edit) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

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
          <Input size="large" value={data.applicationUser?.fullName} disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tổng quyền lợi hiện tại</span>}
          name="totalBenefit"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tổng quyền lợi!',
            },
          ]}
        >
          <InputNumber css={inputStyle} size="large" placeholder="Nhập tổng quyền lợi" />
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
