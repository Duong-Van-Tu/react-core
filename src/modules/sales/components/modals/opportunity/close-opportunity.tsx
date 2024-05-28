/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useLocale } from '@/hooks/locale.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { StatusOpportunity } from '@/modules/sales/enum/status.enum';
import { useOpportunity } from '@/modules/sales/services/opportunity.service';
import { css } from '@emotion/react';
import { Button, Form, FormProps, Row, Space, Select, Input } from 'antd';
import { Fragment, useEffect, useMemo, useState } from 'react';

type CloseOpportunityProps = {
  closeModal: () => void;
  data: DataOpportunityType;
};

type FieldType = {
  status: string;
  reason: string;
};

export const CloseOpportunity = ({ ...props }: CloseOpportunityProps) => {
  const { closeModal, data } = props;
  const { formatMessage } = useLocale();
  const { getAllSaleAndSupplier, updateStatusOpportunityById } = useOpportunity();
  const [form] = Form.useForm();
  const [loading] = useWatchLoading(['edit-statusOpportunityById', false]);
  const status = useRootSelector((state) => state.sale.opportunity.status);
  const [selectedStatusId, setSelectedStatusId] = useState<string>();
  const isFailure = useMemo(
    () => status?.find((item) => item.id === selectedStatusId)?.code === StatusOpportunity.Fail,
    [status, selectedStatusId],
  );
  const isCancel = useMemo(
    () => status?.find((item) => item.id === selectedStatusId)?.code === StatusOpportunity.Cancel,
    [status, selectedStatusId],
  );
  const isOnHold = useMemo(
    () => status?.find((item) => item.id === selectedStatusId)?.code === StatusOpportunity.OnHold,
    [status, selectedStatusId],
  );

  const statusOptions = useMemo(
    () =>
      status?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [status],
  );

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdate = {
      id: data.id,
      applicationUserId: data.applicationUser?.id,
      status: status?.find((item) => item.id === values.status)?.code,
      reason: values.reason,
    } as DataOpportunityType;

    const update = await updateStatusOpportunityById(dataUpdate);
    if (update) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    getAllSaleAndSupplier();
  }, [getAllSaleAndSupplier]);

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Đóng cơ hội</h3>
      <Form
        form={form}
        css={formStyle}
        name="close-opportunity"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={
            <span css={labelFormItem}>{formatMessage({ id: 'title.form.selectStatus' })}</span>
          }
          name="status"
          rules={[
            { required: true, message: formatMessage({ id: 'form.input.require.selectStatus' }) },
          ]}
        >
          <Select
            size="large"
            placeholder={formatMessage({ id: 'title.form.selectStatus' })}
            allowClear
            loading={loading}
            options={statusOptions}
            onSelect={(value) => setSelectedStatusId(value)}
          />
        </Form.Item>
        {(isFailure || isCancel || isOnHold) && (
          <Form.Item<FieldType>
            label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.reason' })}</span>}
            name="reason"
            rules={[
              { required: true, message: formatMessage({ id: 'form.input.require.reason' }) },
            ]}
          >
            <Input.TextArea
              style={{ resize: 'none' }}
              placeholder={formatMessage({ id: 'form.input.reason' })}
            />
          </Form.Item>
        )}

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
  padding: 1rem 0;
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
  color: rgba(16, 24, 40, 1);
`;
