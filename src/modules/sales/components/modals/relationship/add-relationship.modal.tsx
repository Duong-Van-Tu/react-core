/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useRelationship } from '@/modules/sales/services/relationship.service';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, InputNumber, Row, Select, Space } from 'antd';
import { Fragment, useEffect, useMemo } from 'react';

type FieldType = DataAddRelationship;

type AddRelationshipProps = {
  closeModal: () => void;
};

export const AddRelationship = ({ closeModal }: AddRelationshipProps) => {
  const { getListCustomer, addRelationship, getAllLevel } = useRelationship();
  const [loading] = useWatchLoading(['add-relationship', false]);
  const [form] = Form.useForm();
  const { customer: customers, level } = useRootSelector((state) => state.sale.relationship);
  const user = useRootSelector((state) => state.auth.user);

  const customerOptions =
    useMemo(
      () =>
        customers?.map((customer) => ({
          value: customer.id,
          label: customer.fullname,
        })),
      [customers],
    ) ?? [];

  const levelOptions =
    useMemo(
      () =>
        level?.map((levelItem) => ({
          value: levelItem.id,
          label: levelItem.code,
        })),
      [level],
    ) ?? [];

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { point } = values;
    const dataAddRelationship: DataAddRelationship = {
      ...values,
      point: point.toString(),
      applicationUserId: user?.id!,
    };
    const add = await addRelationship(dataAddRelationship);

    if (add) {
      closeModal();
      form.resetFields();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    getListCustomer();
    getAllLevel();
  }, [getListCustomer, getAllLevel]);
  return (
    <Fragment>
      <h3 css={formTitleStyle}> Thêm đề xuất mối quan hệ</h3>
      <Form
        form={form}
        css={formStyle}
        name="add-Relationship"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Công ty</span>}
          name="customerId"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập công ty!',
            },
          ]}
        >
          <Select size="middle" placeholder="Chọn công ty" options={customerOptions} />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Họ tên khách hàng</span>}
          name="customerName"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên khách hàng!',
            },
          ]}
        >
          <Input size="middle" placeholder="Nhập họ tên khách hàng" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Vị trí</span>}
          name="position"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập vị trí!',
            },
          ]}
        >
          <Input size="middle" placeholder="Nhập vị trí" />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mối quan hệ hiện tại</span>}
              name="currentRelationshipId"
              rules={[{ required: true, message: 'Vui lòng nhập mối quan hệ hiện tại!' }]}
            >
              <Select
                size="middle"
                options={levelOptions}
                placeholder="Nhập mối quan hệ hiện tại"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mối quan hệ mục tiêu</span>}
              name="targetRelationshipId"
              rules={[{ required: true, message: 'Vui lòng nhập mối quan hệ mục tiêu!' }]}
            >
              <Select
                size="middle"
                options={levelOptions}
                placeholder="Nhập mối quan hệ mục tiêu"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Lý do cần phải nâng cấp quan hệ</span>}
          name="reason"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lý do cần phải nâng cấp quan hệ!',
            },
          ]}
        >
          <Input.TextArea size="middle" placeholder="Nhập lý do cần phải nâng cấp quan hệ" />
        </Form.Item>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Điểm mục tiêu</span>}
          name="point"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập điểm mục tiêu!',
            },
          ]}
        >
          <InputNumber css={inputStyle} size="middle" placeholder="Nhập điểm mục tiêu" />
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
  .ant-form-item {
    margin-bottom: 1.4rem;
  }
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
