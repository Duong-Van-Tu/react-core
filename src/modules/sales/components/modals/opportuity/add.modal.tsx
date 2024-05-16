/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Button, Col, DatePicker, Form, FormProps, Input, Row, Space } from 'antd';
import Close from '@/assets/svg/close.svg?react';
import { useLocale } from '@/hooks/locale.hook';

type FieldType = {
  customer: string;
  decisionMaker: string;
  technicalPerson: string;
  beneficiary: string;
  customerNeeds: string;
  OpportunityTimeline: string;
  budget: string;
  estimatedPrice: number;
  commissionConsultant: string;
  oneCompetitor: string;
  strengthsAndWeaknessesOneCompetitor: string;
  twoCompetitor: string;
  strengthsAndWeaknessesTwoCompetitor: string;
  strategy: string;
  interactionBetweenCompanyAndCustomer: string;
  WinProbabilityEvaluation: string;
};

export const AddOpportuity = () => {
  const { formatMessage } = useLocale();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    // closeModal();
  };

  const oncancel = () => {
    // closeModal();
  };
  return (
    <div css={containerStyle}>
      <div css={closeStyle}>
        <Close width={20} height={20} />
        <Link to="/sales/opportunity" css={closeLinkStyle}>
          {formatMessage({ id: 'title.exit' })}
        </Link>
      </div>
      <h1 css={titleStyle}>{formatMessage({ id: 'title.addOpportuity' })}</h1>
      <div css={tableStyle}>
        <Form
          css={formUpdateResultStyle}
          name="add-opportunity"
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>{formatMessage({ id: 'form.input.customer' })}</span>
                }
                name="customer"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.customer' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({ id: 'form.input.placeholder.customer' })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.decisionMaker' })}
                  </span>
                }
                name="decisionMaker"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.decisionMaker' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({ id: 'form.input.placeholder.decisionMaker' })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.technicalPerson' })}
                  </span>
                }
                name="technicalPerson"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.technicalPerson' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({ id: 'form.input.placeholder.technicalPerson' })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>{formatMessage({ id: 'form.input.beneficiary' })}</span>
                }
                name="beneficiary"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.beneficiary' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({ id: 'form.input.placeholder.beneficiary' })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType>
            label={
              <span css={labelFormItem}>{formatMessage({ id: 'form.input.customerNeeds' })}</span>
            }
            name="customerNeeds"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'form.input.require.customerNeeds' }),
              },
            ]}
          >
            <Input.TextArea
              placeholder={formatMessage({ id: 'form.input.placeholder.customerNeeds' })}
              css={formTextareaStyle}
            />
          </Form.Item>

          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.OpportunityTimeline' })}
                  </span>
                }
                name="OpportunityTimeline"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.OpportunityTimeline' }),
                  },
                ]}
              >
                <DatePicker placeholder="DD/MM/YYYY" css={formPickerStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>{formatMessage({ id: 'form.input.budget' })}</span>
                }
                name="budget"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.budget' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({ id: 'form.input.placeholder.budget' })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.estimatedPrice' })}
                  </span>
                }
                name="estimatedPrice"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.estimatedPrice' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({ id: 'form.input.placeholder.estimatedPrice' })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.commissionConsultant' })}
                  </span>
                }
                name="commissionConsultant"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.commissionConsultant' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({ id: 'form.input.placeholder.commissionConsultant' })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.oneCompetitor' })}
                  </span>
                }
                name="oneCompetitor"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.oneCompetitor' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({ id: 'form.input.placeholder.oneCompetitor' })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.strengthsAndWeaknesses' })}
                  </span>
                }
                name="strengthsAndWeaknessesOneCompetitor"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.strengthsAndWeaknesses' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.strengthsAndWeaknesses',
                  })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.twoCompetitor' })}
                  </span>
                }
                name="twoCompetitor"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.twoCompetitor' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.twoCompetitor',
                  })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.strengthsAndWeaknesses' })}
                  </span>
                }
                name="strengthsAndWeaknessesTwoCompetitor"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.strengthsAndWeaknesses' }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.strengthsAndWeaknesses',
                  })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType>
            label={<span css={labelFormItem}>{formatMessage({ id: 'form.input.strategy' })}</span>}
            name="strategy"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'form.input.require.strategy' }),
              },
            ]}
          >
            <Input.TextArea
              placeholder={formatMessage({
                id: 'form.input.placeholder.strategy',
              })}
              css={formTextareaStyle}
            />
          </Form.Item>

          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.interactionBetweenCompanyAndCustomer' })}
                  </span>
                }
                name="interactionBetweenCompanyAndCustomer"
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form.input.require.interactionBetweenCompanyAndCustomer',
                    }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.interactionBetweenCompanyAndCustomer',
                  })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>
                    {formatMessage({ id: 'form.input.WinProbabilityEvaluation' })}
                  </span>
                }
                name="WinProbabilityEvaluation"
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form.input.require.WinProbabilityEvaluation',
                    }),
                  },
                ]}
              >
                <Input
                  size="middle"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.WinProbabilityEvaluation',
                  })}
                  css={formInputItemStyle}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Space>
              <Button type="primary" htmlType="submit" css={btnConfirmStyle}>
                Xác nhận
              </Button>
            </Space>
          </Row>
        </Form>
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  max-width: 90rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

const closeStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  margin-top: 3.7rem;
  svg path {
    fill: rgba(0, 0, 0, 1);
  }
`;

const closeLinkStyle = css`
  font-size: 1.4rem;
  color: rgba(16, 24, 40, 1);
  font-weight: 600;
`;

const titleStyle = css`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const tableStyle = css`
  /* padding: 4rem 0; */
`;

const formUpdateResultStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
  padding: 1rem;
`;

const labelFormItem = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 700;
  color: rgba(16, 24, 40, 1);
`;

const formPickerStyle = css`
  width: 100%;
  height: 4.5rem;
  border-radius: 0.8rem;
  input {
    &::placeholder {
      color: rgba(208, 213, 221, 1);
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
`;

const formInputItemStyle = css`
  height: 4.5rem;
  border-radius: 0.8rem;
  &::placeholder {
    color: rgba(208, 213, 221, 1);
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const formTextareaStyle = css`
  resize: none !important;
  height: 9.3rem !important;
  padding-top: 1.25rem;
  padding-left: 1.4rem;
  border-radius: 0.8rem;
  &::placeholder {
    color: rgba(208, 213, 221, 1);
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const btnConfirmStyle = css`
  padding: 1.2rem 5.6rem;
  background: rgba(0, 112, 184, 1);
  border: 1px solid rgba(0, 112, 184, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  span {
    color: #fff;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;
