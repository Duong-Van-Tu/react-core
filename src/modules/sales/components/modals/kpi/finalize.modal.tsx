/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';

type FinalizeKPIProps = {
  closeModal?: () => void;
};
export const FinalizeKPI = ({ closeModal }: FinalizeKPIProps) => {
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý chốt mục tiêu này</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal?.()}>Huỷ</Button>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Space>
      </Row>
    </div>
  );
};

const rootStyle = css`
  margin-top: 2rem;
  padding: 0 2rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2rem;
  text-align: center;
  margin-bottom: 2.4rem;
  font-weight: 500;
`;
