/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useLocale } from '@/hooks/locale.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useOpportunity } from '@/modules/sales/services/opportunity.service';
import { css } from '@emotion/react';
import { Button, Form, FormProps, Row, Space, Select } from 'antd';
import { Fragment, useEffect, useMemo } from 'react';

type AssignOpportunityProps = {
  closeModal: () => void;
  data: DataOpportunityType;
};
type FieldType = {
  saleAndSupplierId: string;
};

export const AssignOpportunity = ({ ...props }: AssignOpportunityProps) => {
  const { closeModal, data } = props;
  const { formatMessage } = useLocale();
  const { getAllSaleAndSupplier, assignSaleAndSupplier } = useOpportunity();
  const [form] = Form.useForm();
  const [loading] = useWatchLoading(['getAllSaleAndSupplier-opportunity', false]);
  const saleAndSupplier = useRootSelector((state) => state.sale.opportunity.saleAndSupplier);

  const saleAndSupplierOptions = useMemo(
    () =>
      saleAndSupplier?.map((user) => ({
        label: user.userName,
        value: user.id,
      })),
    [saleAndSupplier],
  );

  const onCustomerChange = () => {};

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataAssignUser = {
      id: data.id,
      saleAndSupplierId: values.saleAndSupplierId,
    } as DataOpportunityType;

    const assignUser = await assignSaleAndSupplier(dataAssignUser);
    if (assignUser) {
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
      <h3 css={formTitleStyle}>Gán cơ hội cho Sale/NPP</h3>
      <Form
        form={form}
        css={formAssignOpportunityStyle}
        name="assign-opportunity"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.select' })}</span>}
          name="saleAndSupplierId"
          rules={[
            { required: true, message: formatMessage({ id: 'form.input.require.selectCustomer' }) },
          ]}
        >
          <Select
            size="large"
            placeholder={formatMessage({ id: 'title.form.selectCustomer' })}
            onChange={onCustomerChange}
            allowClear
            loading={loading}
            options={saleAndSupplierOptions}
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

const formAssignOpportunityStyle = css`
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
