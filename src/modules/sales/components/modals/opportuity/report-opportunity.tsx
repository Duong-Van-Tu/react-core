/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';

export const ReportOpportunity = () => {
  const { formatMessage } = useLocale();

  return (
    <div css={containerStyle}>
      <div css={closeStyle}>
        <CustomIcon color="rgba(0, 0, 0, 1)" width={20} height={20} type="close" />
        <Link to="/sales/opportunity" css={closeLinkStyle}>
          {formatMessage({ id: 'title.exit' })}
        </Link>
      </div>
      <h1 css={titleStyle}>Xem báo cáo cơ hội</h1>
      <div css={tableStyle}>
        <h2 css={titleTableStyle}>Báo cáo kết quả trạng thái mối quan hệ với khách hàng</h2>
        <div>
          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Khách hàng</p>
            </Col>
            <Col>
              <p css={titleNameTableStyle}>Bùi Công Quân</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Người quyết định</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>Bùi Công Quân</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Người phụ trách kỹ thuật</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>Bùi Công Quân</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Người thụ hưởng</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>Bùi Công Quân</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Người thực hiện cơ hội</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>Bùi Công Quân</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Nhu cầu khách hàng</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Thời điểm dự kiến cơ hội diễn ra</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>11-11-2024</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Budget</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>200.000.000VND</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Giá vốn dự kiến</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>200.000.000VND</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Hoa hồng cho người tư vấn</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>200.000VND</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Đối thủ 1</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>CT ABC - Điểm mạnh: Gía rẻ - Điểm yếu: Vốn cao</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Đối thủ 2</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>CT ABC - Điểm mạnh: Gía rẻ - Điểm yếu: Vốn cao</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Chiến lược của AT&A</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Lần tương tác gần nhất giữa AT&A và khách hàng </p>
            </Col>
            <Col>
              <p css={titleValueStyle}>11-11-2024</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Đánh giá khả năng thắng</p>
            </Col>
            <Col>
              <p css={titleValueStyle}>Cao</p>
            </Col>
          </Row>

          <Row justify="space-between" css={rowTableStyle}>
            <Col>
              <p css={titleContentTableStyle}>Trạng thái</p>
            </Col>
            <Col>
              <div>
                <div css={statusStyle}>
                  <CustomIcon color="#B73012" width={20} height={20} type="dot" />
                  <p>Fail</p>
                </div>
                <p css={titleValueStyle}>Lý do: Khách hủy</p>
              </div>
            </Col>
          </Row>
        </div>
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
  padding: 4rem 0;
`;
const titleTableStyle = css`
  font-size: 2.1rem;
  color: rgba(21, 41, 75, 1);
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`;

const titleContentTableStyle = css`
  font-size: 1.2rem;
  color: #42526d;
  font-weight: 500;
`;

const titleNameTableStyle = css`
  font-size: 1.4rem;
  font-weight: 500;
  color: #101828;
`;

const titleValueStyle = css`
  font-size: 1.4rem;
  font-weight: 500;
  color: #42526d;
`;

const rowTableStyle = css`
  margin-bottom: 1.5rem;
`;

const statusStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  background-color: #fdf2ec;
  border: 1px solid transparent;
  border-radius: 1.6rem;
  padding: 0.2rem 0.7rem;
  margin-bottom: 0.5rem;
  svg path {
    fill: #b73012;
  }
  p {
    font-size: 1.2rem;
    font-weight: 700;
    color: #b73012;
  }
`;
