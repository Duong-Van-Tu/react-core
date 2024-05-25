/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { Button, Col, DatePicker, Form, FormProps, Input, Row, Space, Select } from 'antd';
import dayjs from 'dayjs';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useContract } from '@/modules/category/services/contract.service';
import { useRootSelector } from '@/hooks/selector.hook';

type FieldType = {
  id?: string;
  code: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  customerId: string;
};

type UpdateContractProps = {
  closeModal: () => void;
  data: DataContractType;
};

export const UpdateContract = ({ closeModal, data }: UpdateContractProps) => {
  const [form] = Form.useForm();
  const { updateContract, getAllCustomerContract } = useContract();
  const [loading] = useWatchLoading(['edit-contract', false]);
  const { dataCustomer } = useRootSelector((state) => state.category.contract);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateContract = {
      ...values,
      id: data.id,
      customerId: values.customerId.toString(),
      startDate: dayjs(values.startDate).format('DD/MM/YYYY'),
      endDate: dayjs(values.endDate).format('DD/MM/YYYY'),
    };
    console.log('dataUpdateContract: ', dataUpdateContract);
    const edit = await updateContract(dataUpdateContract);
    if (edit) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    getAllCustomerContract();
  }, [getAllCustomerContract]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        startDate: dayjs(data.startDate),
        endDate: dayjs(data.endDate),
        customerId: data.customer?.code,
      });
    }
  }, [data]);

  const options = dataCustomer.map((item, index) => ({
    label: item.code,
    value: item.id,
    key: index,
  }));

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Chỉnh sửa hợp đồng</h3>
      <Form
        form={form}
        css={formUpdateContractStyle}
        name="add-customer"
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mã HD</span>}
              name="code"
              rules={[{ required: true, message: 'Vui lòng nhập mã KH!' }]}
            >
              <Input placeholder="Nhập mã KH" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Số HD</span>}
              name="number"
              rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
            >
              <Input placeholder="Nhập tên khách hàng" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mã HD</span>}
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập mã KH!' }]}
        >
          <Input placeholder="Nhập mã KH" />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Ngày bắt đầu</span>}
              name="startDate"
              rules={[{ required: true, message: 'Vui lòng nhập ngày bắt đầu !' }]}
            >
              <DatePicker
                css={inputStyle}
                format={['DD/MM/YYYY']}
                placeholder="Nhập ngày bắt đầu"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Ngày kết thúc</span>}
              name="endDate"
              rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
            >
              <DatePicker
                css={inputStyle}
                format={['DD/MM/YYYY']}
                placeholder="Chọn ngày kết thúc"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mã KH</span>}
          name="customerId"
          rules={[{ required: true, message: 'Vui lòng nhập mã KH!' }]}
        >
          <Select options={options} css={inputStyle} placeholder="Chọn khách hàng" />
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

const formTitleStyle = css`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.2rem;
  margin-top: 2rem;
`;

const formUpdateContractStyle = css`
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
`;

const inputStyle = css`
  width: 100%;
`;
