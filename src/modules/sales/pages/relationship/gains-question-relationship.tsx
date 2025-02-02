/** @jsxImportSource @emotion/react */
import { CustomIcon } from '@/components/icons';
import { LocaleFormatter } from '@/components/locale-formatter';
import { getTenant } from '@/utils/common';
import { css } from '@emotion/react';
import { Button, Form, FormProps, Radio, Row, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRelationship } from '../../services/relationship.service';
import { useRootSelector } from '@/hooks/selector.hook';
import { convertToUppercaseFirstLetter } from '@/utils/get-pathCode';
import { useWatchLoading } from '@/hooks/loading.hook';
import { usePermission } from '@/hooks/permission.hook';

export default function GainsQuestionRelationshipPage() {
  const { getRelationshipGainsQuestion, updateRelationshipGainsQuestion } = useRelationship();
  const gainsQuestion = useRootSelector((state) => state.sale.relationship.gainsQuestion);
  const [loading, updateLoading] = useWatchLoading(
    ['relationship-gainsQuestion', true],
    ['relationship-updateGainsQuestion', false],
  );
  const { id: relationshipId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const tenant = getTenant();
  const { isSaleDirector } = usePermission();

  const onFinish: FormProps['onFinish'] = (values) => {
    const updatedGainsQuestion = gainsQuestion?.map((question) => {
      if (values.hasOwnProperty(question.id)) {
        return {
          data: convertToUppercaseFirstLetter({
            ...question,
            answer: `${values[question.id] ?? question.answer}`,
          }),
        };
      }
      return question;
    }) as RelationshipGainsQuestion[];

    updateRelationshipGainsQuestion(updatedGainsQuestion);
  };

  useEffect(() => {
    getRelationshipGainsQuestion(relationshipId!);
  }, [getRelationshipGainsQuestion, relationshipId]);

  return (
    <Spin spinning={loading} size="large">
      <div css={containerStyle}>
        <Button css={closeStyle} onClick={() => navigate(`/sales/relationship?tenant=${tenant}`)}>
          <CustomIcon type="close" width={16} height={16} color="#ccc" />
          <LocaleFormatter id="title.exit" />
        </Button>
        <h1 css={titleStyle}>Đánh giá mối quan hệ</h1>
        <Form
          form={form}
          onFinish={onFinish}
          name="question-gains"
          layout="horizontal"
          css={formStyle}
        >
          {gainsQuestion?.length! > 0 &&
            gainsQuestion?.map((question) => (
              <Form.Item
                label={<span css={questionStyle}>{question.question}</span>}
                name={question.id}
              >
                <Radio.Group
                  name={question.id}
                  css={radioGroupStyle}
                  defaultValue={question.answer}
                >
                  <Radio value={true}>Đồng ý</Radio>
                  <Radio value={false}>Không đồng ý</Radio>
                </Radio.Group>
              </Form.Item>
            ))}
          {isSaleDirector && (
            <Row justify="end">
              <Button loading={updateLoading} size="middle" type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Row>
          )}
        </Form>
      </div>
    </Spin>
  );
}

const containerStyle = css`
  width: 100%;
  max-width: 80rem;
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
  padding-top: 4rem;
`;

const formStyle = css`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  .ant-form-item-required::before {
    display: none !important;
  }
  .ant-form-item-label {
    flex: 0 0 70%;
    max-width: 70%;
    white-space: normal;
    text-align: start;
  }

  .ant-form-item-control {
    flex: 1 1 30%;
  }
`;

const questionStyle = css`
  font-weight: 1.4rem;
  line-height: 1.6rem;
`;

const radioGroupStyle = css`
  width: 100%;
  text-align: end;
`;
