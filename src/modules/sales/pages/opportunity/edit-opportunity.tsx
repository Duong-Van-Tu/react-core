/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Col, DatePicker, Form, FormProps, Input, InputNumber, Row, Spin } from 'antd';
import Close from '@/assets/svg/close.svg?react';
import { useLocale } from '@/hooks/locale.hook';
import { LocaleFormatter } from '@/components/locale-formatter';
import { useNavigate, useParams } from 'react-router-dom';
import { getTenant } from '@/utils/common';
import { useOpportunity } from '@/modules/sales/services/opportunity.service';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';

type FieldType = {
  customerName: string;
  accountable: string;
  technicalLead: string;
  beneficiary: string;
  need: string;
  estimatedTime: string;
  budget: number;
  estimatedMoney: number;
  commissionMoney: number;
  opponent1: string;
  opponent1Attribute: string;
  opponent2: string;
  opponent2Attribute: string;
  strategy: string;
  lastTimeInteract: string;
  winningOppotunity: string;
};

export default function EditOpportunityPage() {
  const { formatMessage } = useLocale();
  const { updateOpportunity, getOpportunityById } = useOpportunity();
  const { id: opportunityId } = useParams();
  const [loading, opportunityDetailLoading] = useWatchLoading(
    ['edit-opportunity', false],
    ['get-opportunityDetail', true],
  );
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const tenant = getTenant();
  const dataOpportunity = useRootSelector((state) => state.sale.opportunity.detail);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const dataUpdateOpportunity = {
      id: opportunityId,
      ...values,
      estimatedMoney: values.estimatedMoney.toString(),
      budget: values.budget.toString(),
      commissionMoney: values.commissionMoney.toString(),
      estimatedTime: dayjs(values.estimatedTime).format('DD/MM/YYYY'),
      lastTimeInteract: dayjs(values.lastTimeInteract).format('DD/MM/YYYY'),
    };
    await updateOpportunity(dataUpdateOpportunity);
  };

  useEffect(() => {
    if (opportunityId) {
      getOpportunityById(opportunityId);
    }
  }, [getOpportunityById, opportunityId]);

  useEffect(() => {
    if (dataOpportunity) {
      const formatData = {
        ...dataOpportunity,
        estimatedTime: dayjs(dataOpportunity.estimatedTime),
        lastTimeInteract: dayjs(dataOpportunity.lastTimeInteract),
      };
      form.setFieldsValue(formatData);
    }
  }, [dataOpportunity]);

  return (
    <Spin spinning={opportunityDetailLoading} size="large">
      <div css={containerStyle}>
        <Button css={closeStyle} onClick={() => navigate(`/sales/opportunity?tenant=${tenant}`)}>
          <Close width={16} height={16} color="#ccc" />
          <LocaleFormatter id="title.exit" />
        </Button>
        <h1 css={titleStyle}>{formatMessage({ id: 'title.editOpportuity' })}</h1>
        <Form
          form={form}
          css={formUpdateResultStyle}
          name="edit-opportunity"
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={
                  <span css={labelFormItem}>{formatMessage({ id: 'form.input.customer' })}</span>
                }
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.customer' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'form.input.placeholder.customer' })}
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
                name="accountable"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.decisionMaker' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'form.input.placeholder.decisionMaker' })}
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
                name="technicalLead"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.technicalPerson' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'form.input.placeholder.technicalPerson' })}
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
                  size="large"
                  placeholder={formatMessage({ id: 'form.input.placeholder.beneficiary' })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType>
            label={
              <span css={labelFormItem}>{formatMessage({ id: 'form.input.customerNeeds' })}</span>
            }
            name="need"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'form.input.require.customerNeeds' }),
              },
            ]}
          >
            <Input.TextArea
              placeholder={formatMessage({ id: 'form.input.placeholder.customerNeeds' })}
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
                name="estimatedTime"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.OpportunityTimeline' }),
                  },
                ]}
              >
                <DatePicker
                  css={inputStyle}
                  size="large"
                  format={['DD/MM/YYYY']}
                  placeholder="DD/MM/YYYY"
                />
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
                <InputNumber
                  css={inputStyle}
                  size="large"
                  placeholder={formatMessage({ id: 'form.input.placeholder.budget' })}
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
                name="estimatedMoney"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.estimatedPrice' }),
                  },
                ]}
              >
                <InputNumber
                  css={inputStyle}
                  size="large"
                  placeholder={formatMessage({ id: 'form.input.placeholder.estimatedPrice' })}
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
                name="commissionMoney"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.commissionConsultant' }),
                  },
                ]}
              >
                <InputNumber
                  css={inputStyle}
                  size="large"
                  placeholder={formatMessage({ id: 'form.input.placeholder.commissionConsultant' })}
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
                name="opponent1"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.oneCompetitor' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'form.input.placeholder.oneCompetitor' })}
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
                name="opponent1Attribute"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.strengthsAndWeaknesses' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.strengthsAndWeaknesses',
                  })}
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
                name="opponent2"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.twoCompetitor' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.twoCompetitor',
                  })}
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
                name="opponent2Attribute"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'form.input.require.strengthsAndWeaknesses' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.strengthsAndWeaknesses',
                  })}
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
                name="lastTimeInteract"
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form.input.require.interactionBetweenCompanyAndCustomer',
                    }),
                  },
                ]}
              >
                <DatePicker
                  format={['DD/MM/YYYY']}
                  css={inputStyle}
                  size="large"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.interactionBetweenCompanyAndCustomer',
                  })}
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
                name="winningOppotunity"
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
                  size="large"
                  placeholder={formatMessage({
                    id: 'form.input.placeholder.WinProbabilityEvaluation',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Button loading={loading} size="large" type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Row>
        </Form>
      </div>
    </Spin>
  );
}

const containerStyle = css`
  width: 100%;
  max-width: 90rem;
  height: 100%;
  margin: 3rem auto;
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
  line-height: 2.4rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
`;

const formUpdateResultStyle = css`
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
