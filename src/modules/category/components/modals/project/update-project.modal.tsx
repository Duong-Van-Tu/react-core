/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { Button, Form, FormProps, Input, Row, Space, Select } from 'antd';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useProject } from '@/modules/category/services/project.service';

type FieldType = {
  id?: string;
  result: string;
  point: number;
  service: string;
  note: string;
  projectStatusId: string;
};

type UpdateProjectProps = {
  closeModal: () => void;
  data: DataProjectType;
};

export const UpdateProject = ({ closeModal, data }: UpdateProjectProps) => {
  const [form] = Form.useForm();
  const { updateProject, getAllStatusProject } = useProject();
  const [loading] = useWatchLoading(['update-project', false]);
  const { dataStatus } = useRootSelector((state) => state.category.project);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateProject = {
      ...values,
      id: data.id,
      projectStatusId: values.projectStatusId.toString(),
    };
    const update = await updateProject(dataUpdateProject);
    if (update) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
    form.resetFields();
  };

  useEffect(() => {
    getAllStatusProject();
  }, [getAllStatusProject]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        projectStatusId: data.projectStatus?.name,
      });
    }
  }, [data]);

  const options = dataStatus?.map((item, index) => ({
    label: item.name,
    value: item.id,
    key: index,
  }));

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Cập nhật dự án</h3>
      <Form
        form={form}
        css={formUpdateProjectStyle}
        name="add-customer"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Kết quả</span>}
          name="result"
          rules={[{ required: true, message: 'Vui lòng nhập kết quả!' }]}
        >
          <Input placeholder="Nhập kết quả" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Điểm đạt</span>}
          name="point"
          rules={[{ required: true, message: 'Vui lòng nhập điểm đạt!' }]}
        >
          <Input placeholder="Nhập điểm đạt" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Trạng thái</span>}
          name="projectStatusId"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          <Select options={options} css={inputStyle} placeholder="Chọn trạng thái" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Ghi chú</span>}
          name="note"
          rules={[{ required: true, message: 'Vui lòng nhập ghi chú!' }]}
        >
          <Input placeholder="Nhập ghi chú" />
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

const formUpdateProjectStyle = css`
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
