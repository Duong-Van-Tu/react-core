/** @jsxImportSource @emotion/react */
import { CustomIcon } from '@/components/icons';
import { LocaleFormatter } from '@/components/locale-formatter';
import { getTenant } from '@/utils/common';
import { css } from '@emotion/react';
import { Button, Col, Form, FormProps, Row, message as messageAnt } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRelationship } from '../../services/relationship.service';
import { useRootSelector } from '@/hooks/selector.hook';

type FieldType = any;
export default function GainsQuestionRelationshipPage() {
  const { getRelationshipGainsQuestion } = useRelationship();
  const [messageApi, contextHolder] = messageAnt.useMessage();
  const gainsQuestion = useRootSelector((state) => state.sale.relationship.gainsQuestion);
  const { id: relationshipId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const tenant = getTenant();
  console.log({ gainsQuestion });

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {};

  useEffect(() => {
    getRelationshipGainsQuestion(relationshipId!);
  }, [getRelationshipGainsQuestion, relationshipId]);
  return (
    <div css={containerStyle}>
      {contextHolder}
      <Button css={closeStyle} onClick={() => navigate(`/sales/relationship?tenant=${tenant}`)}>
        <CustomIcon type="close" width={16} height={16} color="#ccc" />
        <LocaleFormatter id="title.exit" />
      </Button>
      <h1 css={titleStyle}>Cập nhật kết quả mối quan hệ</h1>
      <Form form={form} onFinish={onFinish} name="question-gains" layout="vertical" css={formStyle}>
        {gainsQuestion?.length! > 0 &&
          gainsQuestion?.map((question) => (
            <Row gutter={[20, 0]}>
              <Col span={12}>
                <span css={questionStyle}>{question.question}</span>
              </Col>
              <Col span={12}></Col>
            </Row>
          ))}
      </Form>
    </div>
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
`;

const formStyle = css`
  .ant-form-item-required::before {
    display: none !important;
  }
  margin-top: 2rem;
`;

const questionStyle = css`
  font-weight: 1.4rem;
  line-height: 1.6rem;
`;
