/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { usePermission } from '@/hooks/permission.hook';
import { Status } from '@/modules/sales/enum/status.enum';
import { useKPI } from '@/modules/sales/services/kpi.service';
import { css } from '@emotion/react';
import { Button, Col, DatePicker, Form, FormProps, Input, InputNumber, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { Fragment, useEffect } from 'react';

type FieldType = {
  endTime: string;
  targetKPI: number;
  targetPoint: number;
  suggestEndTime: string;
  suggestTargetKPI: number;
  suggestTargetPoint: number;
};

type RequestEditProps = {
  closeModal: () => void;
  data: DataKPIType;
};

export const RequestEdit = ({ closeModal, data }: RequestEditProps) => {
  const { refuseEditKPI, updateStatusKPI } = useKPI();
  const [form] = Form.useForm();
  const [loading, loadingRefuseEdit] = useWatchLoading(
    ['edit-status', false],
    ['kpi-refuseEdit', false],
  );
  const { isSaleDirector, isSale, isSupplier } = usePermission();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { suggestEndTime, suggestTargetKPI, suggestTargetPoint } = values;
    const dataUpdateKPI = {
      id: data.id,
      suggestEndTime: dayjs(suggestEndTime).format('DD/MM/YYYY'),
      suggestTargetKPI: suggestTargetKPI.toString(),
      suggestTargetPoint: suggestTargetPoint.toString(),
      applicationUserId: data.userSuggest?.id,
      status: isSale || isSupplier ? Status.Request : Status.Updated,
    } as DataKPIType;

    const editStatus = await updateStatusKPI(dataUpdateKPI);
    if (editStatus) {
      form.resetFields();
      closeModal();
    }
  };

  const handleRefuseEditKPI = async () => {
    const refuseEdit = await refuseEditKPI(data);
    if (refuseEdit) {
      closeModal();
    }
  };

  const oncancel = () => {
    closeModal();
  };

  useEffect(() => {
    form.setFieldsValue({
      ...data,
      endTime: dayjs(data.endTime).format('DD/MM/YYYY'),
      suggestEndTime: null,
      suggestTargetKPI: null,
      suggestTargetPoint: null,
    });
  }, [data]);

  return (
    <Fragment>
      <h3 css={formTitleStyle}>
        {isSaleDirector ? 'Xem đề xuất chỉnh sửa' : 'Đề xuất chỉnh sửa mục tiêu'}
      </h3>
      <Form form={form} css={formStyle} name="edit-kpi" onFinish={onFinish} layout="vertical">
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Thời gian kết thúc mục tiêu hiện tại</span>}
          name="endTime"
        >
          <Input css={inputStyle} size="large" disabled />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mục tiêu hiện tại</span>}
              name="targetKPI"
            >
              <InputNumber css={inputStyle} size="large" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm Mục tiêu hiên tại</span>}
              name="targetPoint"
            >
              <InputNumber css={inputStyle} size="large" disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Thời gian kết thúc mục tiêu muốn chỉnh sửa</span>}
          name="suggestEndTime"
        >
          <DatePicker size="large" format={['DD/MM/YYYY']} css={inputStyle} />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mục tiêu muốn chỉnh sửa</span>}
              name="suggestTargetKPI"
              rules={[{ required: true, message: 'Vui lòng nhập mục tiêu muốn chỉnh sửa!' }]}
            >
              <InputNumber
                size="large"
                css={inputStyle}
                placeholder="Nhập mục tiêu muốn chỉnh sửa"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điểm mục tiêu muốn chỉnh sửa</span>}
              name="suggestTargetPoint"
              rules={[{ required: true, message: 'Vui lòng nhập điểm mục tiêu muốn chỉnh sửa!' }]}
            >
              <InputNumber
                size="large"
                css={inputStyle}
                placeholder="Nhập điểm mục tiêu muốn chỉnh sửa"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" css={formFooterStyle}>
          <Space>
            <Button onClick={oncancel}>Huỷ</Button>
            {isSaleDirector && (
              <Button
                loading={loadingRefuseEdit}
                ghost
                type="primary"
                onClick={handleRefuseEditKPI}
              >
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
`;

const formFooterStyle = css`
  margin-top: 1rem;
`;

const inputStyle = css`
  width: 100%;
`;
