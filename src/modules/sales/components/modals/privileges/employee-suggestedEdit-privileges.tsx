/** @jsxImportSource @emotion/react */
import { useLocale } from '@/hooks/locale.hook';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Input, Row, Space } from 'antd';
import { Fragment } from 'react';

type EmployeeSuggestedEditPrivilegesProps = {
  closeModal: () => void;
};
type FieldType = {
  baseSalary: number;
  totalChangesTarget: number;
  actualSalaryFluctuates: number;
  baseSalaryEdit: number;
  totalChangesTargetEdit: number;
  actualSalaryFluctuatesEdit: number;
};

export const EmployeeSuggestedEditPrivileges = ({
  ...props
}: EmployeeSuggestedEditPrivilegesProps) => {
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
      <h3 css={formTitleStyle}>Đề xuất chỉnh sửa quyền lợi</h3>
      <Form
        css={formEmployeeSuggestedEditPrivilegesStyle}
        name="edit-kpi"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={
            <span css={labelFormTopItem}>
              {formatMessage({ id: 'form.input.employeePrivileges.baseSalary' })}
            </span>
          }
          name="baseSalary"
          rules={[{ required: true, message: '' }]}
        >
          <Input css={inputFormTopItem} />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormTopItem}>
                  {formatMessage({ id: 'form.input.employeePrivileges.totalChangesTarget' })}
                </span>
              }
              name="totalChangesTarget"
              rules={[{ required: true, message: '' }]}
            >
              <Input size="middle" css={inputFormTopItem} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormTopLeftItem}>
                  {formatMessage({ id: 'form.input.employeePrivileges.actualSalaryFluctuates' })}
                </span>
              }
              name="actualSalaryFluctuates"
              rules={[{ required: true, message: '' }]}
            >
              <Input size="middle" css={inputFormTopItem} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          label={
            <span css={labelFormBottomItem}>
              {formatMessage({ id: 'form.input.employeePrivileges.baseSalaryEdit' })}
            </span>
          }
          name="baseSalaryEdit"
          rules={[{ required: true, message: '' }]}
        >
          <Input size="middle" css={inputFormBottomItem} />
        </Form.Item>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormBottomItem}>
                  {formatMessage({ id: 'form.input.employeePrivileges.totalChangesTargetEdit' })}
                </span>
              }
              name="totalChangesTargetEdit"
              rules={[{ required: true, message: '' }]}
            >
              <Input size="middle" css={inputFormBottomItem} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label={
                <span css={labelFormBottomItem}>
                  {' '}
                  {formatMessage({
                    id: 'form.input.employeePrivileges.actualSalaryFluctuatesEdit',
                  })}
                </span>
              }
              name="actualSalaryFluctuatesEdit"
              rules={[{ required: true, message: '' }]}
            >
              <Input size="middle" css={inputFormBottomItem} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row justify="end">
        <Space>
          <Button onClick={oncancel}>Huỷ</Button>
          <Button onClick={oncancel} css={btnAutoEditStyle}>
            Tự động chỉnh sửa
          </Button>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Space>
      </Row>
    </Fragment>
  );
};

const formEmployeeSuggestedEditPrivilegesStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin: 2.4rem 0;
`;

const formTitleStyle = css`
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.6rem;
  margin-top: 2rem;
`;

const labelFormTopItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  color: rgba(66, 82, 109, 1);
`;
const labelFormTopLeftItem = css`
  font-size: 1.4rem;
  line-height: 3.5rem;
  font-weight: 600;
  color: rgba(66, 82, 109, 1);
`;
const labelFormBottomItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
`;

const inputFormTopItem = css`
  background: rgba(239, 241, 244, 1);
  border: 1px solid rgba(239, 241, 244, 1);
  border-radius: 0.8rem;
  color: rgba(66, 82, 109, 1);
  font-weight: 600;
  &:hover {
    background: rgba(239, 241, 244, 1);
  }
  &:focus {
    background: rgba(239, 241, 244, 1);
  }
`;
const inputFormBottomItem = css`
  border-radius: 0.8rem;
  color: rgba(66, 82, 109, 1);
  font-weight: 600;
`;

const btnAutoEditStyle = css`
  border: 1px solid rgba(0, 112, 184, 1);
  border-radius: 0.8rem;
  color: rgba(0, 112, 184, 1);
  background-color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
