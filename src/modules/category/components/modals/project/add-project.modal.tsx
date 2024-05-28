/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { Button, Form, FormProps, Input, Row, Space, Select } from 'antd';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useProject } from '@/modules/category/services/project.service';

type FieldType = {
  code: string;
  name: string;
  service: string;
  type: string;
  ApplicationUserId: string;
};

type AddProjectProps = {
  closeModal: () => void;
};

export const AddProject = ({ closeModal }: AddProjectProps) => {
  const [form] = Form.useForm();
  const { addKProject, getAllApplicationUserProject } = useProject();
  const [loading] = useWatchLoading(['add-project', false]);
  const { dataApplicationUser } = useRootSelector((state) => state.category.project);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataAddProject = {
      ...values,
      ApplicationUserId: values.ApplicationUserId.toString(),
    };
    const add = await addKProject(dataAddProject);
    if (add) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
    form.resetFields();
  };

  useEffect(() => {
    getAllApplicationUserProject();
  }, [getAllApplicationUserProject]);

  const options = dataApplicationUser.map((item, index) => ({
    label: item.userName,
    value: item.id,
    key: index,
  }));

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Thêm dự án</h3>
      <Form
        form={form}
        css={formAddProjectStyle}
        name="add-customer"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mã dự án</span>}
          name="code"
          rules={[{ required: true, message: 'Vui lòng nhập mã dự án!' }]}
        >
          <Input placeholder="Nhập mã dự án" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tên dự án</span>}
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên dự án!' }]}
        >
          <Input placeholder="Nhập tên dự án" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Loại dự án</span>}
          name="type"
          rules={[{ required: true, message: 'Vui lòng nhập loại dự án!' }]}
        >
          <Input placeholder="Nhập loại dự án" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mảng kinh doanh</span>}
          name="service"
          rules={[{ required: true, message: 'Vui lòng nhập mảng kinh doanh!' }]}
        >
          <Input placeholder="Nhập mảng kinh doanh" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Phụ trách</span>}
          name="ApplicationUserId"
          rules={[{ required: true, message: 'Vui lòng chọn người phụ trách!' }]}
        >
          <Select options={options} css={inputStyle} placeholder="Chọn người phụ trách" />
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

const formAddProjectStyle = css`
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
