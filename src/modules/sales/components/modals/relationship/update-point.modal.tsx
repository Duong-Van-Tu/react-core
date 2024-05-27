/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useRelationship } from '@/modules/sales/services/relationship.service';
import { css } from '@emotion/react';
import { Button, Form, FormProps, InputNumber, Row, Select, Space } from 'antd';
import { Fragment, useEffect, useMemo } from 'react';

type FieldType = DataUpdatePointRelationship;

type UpdatePointProps = {
  closeModal: () => void;
  data: DataRelationshipType;
};

export const UpdatePoint = ({ closeModal, data }: UpdatePointProps) => {
  const { UpdatePoint, getAllLevel } = useRelationship();
  const [loading] = useWatchLoading(['relationship-updatePoint', false]);
  const [form] = Form.useForm();
  const { level } = useRootSelector((state) => state.sale.relationship);

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
    const { actualPoint, currentRelationshipLevelId } = values;
    const dataUpdatePoint = {
      id: data.id,
      currentRelationshipLevelId,
      actualPoint: actualPoint.toString(),
    };
    const update = await UpdatePoint(dataUpdatePoint);
    if (update) {
      form.resetFields();
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    getAllLevel();
  }, [getAllLevel]);

  return (
    <Fragment>
      <h3 css={formTitleStyle}>Cập nhật</h3>
      <Form form={form} css={formStyle} name="update-point" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Mức độ quan hệ hiện tại</span>}
          name="currentRelationshipLevelId"
          rules={[{ required: true, message: 'Vui lòng nhập mối quan hệ hiện tại!' }]}
        >
          <Select size="large" options={levelOptions} placeholder="Nhập mối quan hệ hiện tại" />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Điểm thực tế</span>}
          name="actualPoint"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập điểm mục tiêu!',
            },
          ]}
        >
          <InputNumber css={inputStyle} size="large" placeholder="Nhập điểm mục tiêu" />
        </Form.Item>
        <Row justify="end">
          <Space>
            <Button onClick={oncancel}>Huỷ</Button>
            <Button loading={loading} type="primary" htmlType="submit">
              Cập nhật
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
