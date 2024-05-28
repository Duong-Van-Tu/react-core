/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useRelationship } from '../../services/relationship.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useRootSelector } from '@/hooks/selector.hook';
import { Button, Col, DatePicker, Form, FormProps, Input, Row, message as messageAnt } from 'antd';
import { getTenant } from '@/utils/common';
import { CustomIcon } from '@/components/icons';
import { LocaleFormatter } from '@/components/locale-formatter';
import { Messages } from '@/constants/message';
import { useWatchMessage } from '@/hooks/message.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import dayjs from 'dayjs';

type FieldType = GainsRelationshipType;

export default function UpdateGainsRelationship() {
  const { getGainsRelationshipById, updateGainsRelationship } = useRelationship();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading] = useWatchLoading(['updateGainsDetail-loading', false]);
  const [messageApi, contextHolder] = messageAnt.useMessage();
  const gains = useRootSelector((state) => state.sale.relationship.gains);
  const { errors } = useWatchMessage('gainsDetail-message');
  const tenant = getTenant();
  const { id: relationshipId } = useParams();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateGains = {
      id: gains?.id,
      ...values,
      dayOfBirth: dayjs(values.dayOfBirth).format('DD/MM/YYYY'),
    };
    const update = await updateGainsRelationship(dataUpdateGains);
    if (update) {
      messageApi.success(Messages.UPDATE_SUCCESS);
    } else {
      messageApi.success(errors[0]);
    }
  };

  useEffect(() => {
    getGainsRelationshipById(relationshipId!);
  }, [getGainsRelationshipById, relationshipId]);

  useEffect(() => {
    form.setFieldsValue({ ...gains, dayOfBirth: dayjs(gains?.dayOfBirth) });
  }, [gains]);

  return (
    <div css={containerStyle}>
      {contextHolder}
      <Button css={closeStyle} onClick={() => navigate(`/sales/relationship?tenant=${tenant}`)}>
        <CustomIcon type="close" width={16} height={16} color="#ccc" />
        <LocaleFormatter id="title.exit" />
      </Button>
      <h1 css={titleStyle}>Cập nhật kết quả mối quan hệ</h1>
      <h3 css={subTitle}>Bảng GAINS</h3>
      <Form form={form} css={formStyle} name="update-gains" onFinish={onFinish} layout="vertical">
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Ngày sinh</span>}
              name="dayOfBirth"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày sinh!',
                },
              ]}
            >
              <DatePicker
                css={inputStyle}
                format={['DD/MM/YYYY']}
                size="middle"
                placeholder="Nhập ngày sinh"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Nguyên quán</span>}
              name="nativePlace"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nguyên quán!',
                },
              ]}
            >
              <Input size="middle" placeholder="Nhập nguyên quán" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Tên các trường đã học và năm học</span>}
          name="schoolAndYear"
          rules={[
            {
              required: true,
              message: 'Vui lòng tên các trường đã học và năm học!',
            },
          ]}
        >
          <Input.TextArea
            size="large"
            placeholder="Nhập tên các trường đã học và năm học"
            allowClear
          />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Email</span>}
              name="email"
              rules={[{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ!' }]}
            >
              <Input type="email" css={inputStyle} size="middle" placeholder="Nhập email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Số điện thoại</span>}
              name="phone"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: 'Số điện thoại không hợp lệ!',
                },
              ]}
            >
              <Input size="middle" placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Tên công ty</span>}
              name="company"
            >
              <Input css={inputStyle} size="middle" placeholder="Nhập tên công ty" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Các bằng cấp</span>}
              name="degree"
            >
              <Input size="middle" placeholder="Nhập các bằng cấp" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Chức danh trong doanh nghiệp</span>}
              name="position"
            >
              <Input size="middle" placeholder="Nhập chức danh trong doanh nghiệp" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Thời gian nắm giữ chức danh trên</span>}
              name="positionTerm"
            >
              <Input size="middle" placeholder="Nhập thời gian nắm giữ chức danh trên" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Công việc đã trải qua</span>}
              name="formerJob"
            >
              <Input size="middle" placeholder="Nhập công việc đã trải qua" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Địa chỉ nơi ở hiện nay</span>}
              name="address"
            >
              <Input size="middle" placeholder="Nhập địa chỉ nơi ở hiện nay" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>Thông tin gia đình</span>}
          name="family"
        >
          <Input size="middle" placeholder="Nhập địa thông tin gia đình" />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Chuyên môn chính</span>}
              name="speciality"
            >
              <Input size="middle" placeholder="Nhập chuyên môn chính" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Thói quen hằng ngày</span>}
              name="habit"
            >
              <Input size="middle" placeholder="Nhập thói quen hằng ngày" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Sở trường</span>}
              name="strongPoint"
            >
              <Input size="middle" placeholder="Nhập sở trường" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType> label={<span css={labelFormItem}>Sở đoạn</span>} name="weakPoint">
              <Input size="middle" placeholder="Nhập sở đoạn" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Sở thích (món ăn, âm nhạc,...)</span>}
              name="hobby"
            >
              <Input size="middle" placeholder="Nhập sở thích" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điều không thích</span>}
              name="dislike"
            >
              <Input size="middle" placeholder="Nhập điều không thích" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Những hoạt động yêu thích</span>}
              name="faviroteActivity"
            >
              <Input size="middle" placeholder="Nhập những hoạt động yêu thích" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Khát vọng cháy bỏng</span>}
              name="aspiration"
            >
              <Input size="middle" placeholder="Nhập khát vọng cháy bỏng" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Ngày T7, CN thường làm gì</span>}
              name="weekendActivity"
            >
              <Input size="middle" placeholder="nhập Ngày T7, CN thường làm gì" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Mong muốn gì 1-2 năm tới</span>}
              name="longGoal"
            >
              <Input size="middle" placeholder="Nhập mong muốn gì 1-2 năm tới" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Thần tượng Nhân vật ưa thích là ai</span>}
              name="idol"
            >
              <Input size="middle" placeholder="nhập thần tượng Nhân vật ưa thích là ai" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Điều quan tâm trong 1-2-3 tháng tới</span>}
              name="nearGoal"
            >
              <Input size="middle" placeholder="Nhập điều quan tâm trong 1-2-3 tháng tới" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>Các CLB, tổ chức tham dự</span>}
              name="clubs"
            >
              <Input size="middle" placeholder="nhập các CLB, tổ chức tham dự" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormItem}>
                  Những thành tựu, tài sản, kinh nghiệm, kiến thức, kỹ năng, bằng cấp…
                </span>
              }
              name="archivement"
            >
              <Input
                size="middle"
                placeholder="Nhập những thành tựu, tài sản, kinh nghiệm, kiến thức, kỹ năng, bằng cấp…"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Button loading={loading} size="middle" type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Row>
      </Form>
    </div>
  );
}

const containerStyle = css`
  width: 100%;
  max-width: 100rem;
  height: 100%;
  margin: 4rem auto;
  position: relative;
`;

const closeStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  &:hover {
    svg {
      path {
        fill: #4096ff;
      }
    }
  }
`;

const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.6rem;
  font-weight: 500;
  color: rgba(16, 24, 40, 1);
`;

const subTitle = css`
  font-size: 1.8rem;
  line-height: 2rem;
  font-weight: 500;
  margin-top: 2rem;
  color: rgba(16, 24, 40, 1);
`;

const formStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
  color: rgba(16, 24, 40, 1);
`;

const inputStyle = css`
  width: 100%;
`;
