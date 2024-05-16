/** @jsxImportSource @emotion/react */
import { useLocale } from '@/hooks/locale.hook';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment } from 'react';

type UpdateOpportuityProps = {
  closeModal: () => void;
};
type FieldType = {
  target: string;
  activity: string;
  time: string;
  result: string;
};

export const UpdateOpportuity = ({ ...props }: UpdateOpportuityProps) => {
  const { closeModal } = props;
  const { formatMessage } = useLocale();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    closeModal();
  };

  const oncancel = () => {
    closeModal();
  };
  return (
    <Fragment>
      <h3 css={formTitleStyle}>Thêm cập nhật cơ hội</h3>
      <Form
        css={formUpdateOpportuityStyle}
        name="update-opportuity"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.target' })}</span>}
          name="target"
          rules={[{ required: true, message: formatMessage({ id: 'form.input.require.target' }) }]}
        >
          <Input placeholder={formatMessage({ id: 'form.input.target' })} css={inputFormItem} />
        </Form.Item>

        <Form.Item<FieldType>
          label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.activity' })}</span>}
          name="activity"
          rules={[
            { required: true, message: formatMessage({ id: 'form.input.require.activity' }) },
          ]}
        >
          <Input.TextArea
            placeholder={formatMessage({ id: 'form.input.activity' })}
            style={{ resize: 'none' }}
            css={textAreaStyle}
          />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.time' })}</span>}
              name="time"
              rules={[
                { required: true, message: formatMessage({ id: 'form.input.require.time' }) },
              ]}
            >
              <Input
                size="middle"
                placeholder={formatMessage({ id: 'form.input.target' })}
                css={inputFormItem}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={<span css={labelFormItem}>{formatMessage({ id: 'title.form.result' })}</span>}
              name="result"
              rules={[
                { required: true, message: formatMessage({ id: 'form.input.require.result' }) },
              ]}
            >
              <Input
                size="middle"
                placeholder={formatMessage({ id: 'form.input.realityKPI' })}
                css={inputFormItem}
              />
            </Form.Item>
          </Col>
        </Row>

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

const formUpdateOpportuityStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
  padding: 1rem 0;
`;

const formTitleStyle = css`
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.6rem;
  margin-top: 3rem;
  color: rgba(21, 41, 75, 1);
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
`;

const inputFormItem = css`
  height: 4.5rem;
  padding: 0.8rem 1.4rem;
  &::placeholder {
    color: rgba(208, 213, 221, 1);
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const textAreaStyle = css`
  padding: 0.8rem 1.4rem;
  &::placeholder {
    color: rgba(208, 213, 221, 1);
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
