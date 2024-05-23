/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRootSelector } from '@/hooks/selector.hook';
import { useEffect } from 'react';
import { useOpportunity } from '../../services/opportunity.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import dayjs from 'dayjs';
import { Message } from '@/components/message';
import { StatusOpportunity } from '../../enum/status.enum';
import { CustomIcon } from '@/components/icons';
import { LocaleFormatter } from '@/components/locale-formatter';
import { getTenant } from '@/utils/common';

export default function ReportOpportunityPage() {
  const report = useRootSelector((state) => state.sale.opportunity.detail);
  const { id: opportunityId } = useParams();
  const { getOpportunityById } = useOpportunity();
  const navigate = useNavigate();
  const tenant = getTenant();

  let messageType: MessageType;
  switch (report?.opportunityStatus?.code) {
    case StatusOpportunity.Active:
      messageType = 'success';
      break;
    case StatusOpportunity.Cancel:
    case StatusOpportunity.Close:
      messageType = 'error';
      break;
    default:
      messageType = 'warning';
  }

  useEffect(() => {
    getOpportunityById(opportunityId!);
  }, [getOpportunityById, opportunityId]);
  return (
    <div css={rootStyle}>
      <div css={containerStyle}>
        <Button css={closeStyle} onClick={() => navigate(`/sales/opportunity?tenant=${tenant}`)}>
          <CustomIcon type="close" width={16} height={16} color="#ccc" />
          <LocaleFormatter id="title.exit" />
        </Button>
        <h1 css={titleStyle}>Xem báo cáo cơ hội</h1>
        <Row justify="center">
          <Col>
            <h3 css={subTitleStyle}>Báo cáo kết quả trạng thái mối quan hệ với khách hàng</h3>
          </Col>
        </Row>
        <div css={contentStyle}>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Khách hàng</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.customerName} </div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Người quyết định</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.accountable}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Người phụ trách kỹ thuật</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.technicalLead}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Người thụ hưởng</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.beneficiary}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Người thực hiện cơ hội</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.applicationUser?.fullName}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Nhu cầu khách hàng</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.need}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Thời điểm dự kiến cơ hội diễn ra</span>
            </Col>
            <Col span={12} css={valueReportStyle}>
              {dayjs(report?.estimatedTime).format('DD/MM/YYYY')}
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Budget</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.budget}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Giá vốn dự kiến</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.estimatedMoney}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Hoa hồng cho người tư vấn</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.commissionMoney}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Đối thủ 1</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.opponent1}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Điểm mạnh điểm yếu đối thủ 1</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.opponent1Attribute}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Đối thủ 2</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.opponent2}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Điểm mạnh điểm yếu đối thủ 2</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.opponent2Attribute}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Chiến lược của AT&A</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.strategy}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Lần tương tác gần nhất giữa AT&A và khách hàng </span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.lastTimeInteract}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={12}>
              <span css={labelStyle}>Đánh giá khả năng thắng</span>
            </Col>
            <Col span={12}>
              <div css={valueReportStyle}>{report?.winningOppotunity}</div>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[20, 0]}>
            <Col span={18}>
              <span css={labelStyle}>Trạng thái</span>
            </Col>
            <Col span={6}>
              <div css={valueReportStyle}>
                <Message hasBackground type={messageType}>
                  {report?.opportunityStatus?.name!}
                </Message>
                <br />
                {report?.opportunityStatus?.code === StatusOpportunity.Fail &&
                  `Lý do huỷ: ${report.reason}`}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

const rootStyle = css`
  display: flex;
  justify-content: center;
`;

const containerStyle = css`
  max-width: 80rem;
  width: 80rem;
  margin: 4rem 0;
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
`;

const subTitleStyle = css`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.2rem;
  margin-top: 4rem;
`;

const contentStyle = css`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const labelStyle = css`
  font-size: 1.6rem;
  line-height: 1.8rem;
  font-weight: 500;
  width: 100%;
  display: block;
  text-align: left;
`;

const valueReportStyle = css`
  text-align: right;
  display: block;
  width: 100%;
`;
