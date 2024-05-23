/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useLocale } from '@/hooks/locale.hook';
import { usePermission } from '@/hooks/permission.hook';
import { StatusBenefit } from '@/modules/sales/enum/status.enum';
import { useBenefit } from '@/modules/sales/services/benefit.service';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, InputNumber, Row, Space } from 'antd';
import { Fragment } from 'react';

type SuggestEditPrivilegesProps = {
  closeModal: () => void;
  data: DataBenefitType;
};
type FieldType = {
  monthlySalary: number;
  targetSalary: number;
  totalSalary: number;
};

export const SuggestEditPrivileges = ({ closeModal, data }: SuggestEditPrivilegesProps) => {
  const { formatMessage } = useLocale();
  const { updateStatusById, refuseEditBenefit } = useBenefit();
  const { isSale, isSaleDirector } = usePermission();
  const [form] = Form.useForm();
  const [loading, refuseEditLoading] = useWatchLoading(
    ['edit-statusBenefit', false],
    ['refuseEdit-benefit', false],
  );

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { monthlySalary, targetSalary, totalSalary } = values;
    const dataUpdateBenefit = {
      id: data.id,
      ...values,
      monthlySalary: monthlySalary.toString(),
      targetSalary: targetSalary.toString(),
      totalSalary: totalSalary.toString(),
      applicationUserId: data.applicationUser?.id,
      status: isSale ? StatusBenefit.Request : StatusBenefit.Updated,
    };
    const edit = await updateStatusById(dataUpdateBenefit);
    if (edit) {
      form.resetFields();
      closeModal();
    }
  };

  const handlerefuseEdit = async () => {
    const refuseEdit = await refuseEditBenefit(data);
    if (refuseEdit) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Đề xuất chỉnh sửa quyền lợi</h3>
      <Form
        form={form}
        css={formStyle}
        name="requestEdit-privileges"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.employeePrivileges.baseSalary' })}
            </span>
          }
        >
          <Input value={data.monthlySalary} size="large" disabled />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormItem}>
                  {formatMessage({ id: 'form.input.employeePrivileges.totalChangesTarget' })}
                </span>
              }
            >
              <Input value={data.targetSalary} size="large" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormItem}>
                  {formatMessage({ id: 'form.input.employeePrivileges.actualSalaryFluctuates' })}
                  <br />
                  <br />
                </span>
              }
            >
              <Input value={data.totalSalary} size="large" disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>
              {formatMessage({ id: 'form.input.employeePrivileges.baseSalaryEdit' })}
            </span>
          }
          name="monthlySalary"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mức lương cố định hàng tháng muốn chỉnh sửa',
            },
          ]}
        >
          <InputNumber css={inputStyle} size="large" />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormItem}>
                  {formatMessage({ id: 'form.input.employeePrivileges.totalChangesTargetEdit' })}
                </span>
              }
              name="targetSalary"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tổng quyền lợi biến động mục tiêu muốn chỉnh sửa',
                },
              ]}
            >
              <InputNumber css={inputStyle} size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormItem}>
                  {formatMessage({
                    id: 'form.input.employeePrivileges.actualSalaryFluctuatesEdit',
                  })}
                </span>
              }
              name="totalSalary"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Mức lương biến động thực tế muốn chỉnh sửa',
                },
              ]}
            >
              <InputNumber css={inputStyle} size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" css={formFooterStyle}>
          <Space>
            <Button onClick={oncancel}>Huỷ</Button>
            {isSaleDirector && (
              <Button loading={refuseEditLoading} onClick={handlerefuseEdit} type="primary" ghost>
                Từ chối chỉnh sửa
              </Button>
            )}

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

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
  color: #101828;
`;

const formTitleStyle = css`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.2rem;
  margin-top: 2rem;
`;

const formFooterStyle = css`
  margin-top: 1rem;
`;

const inputStyle = css`
  width: 100%;
`;
