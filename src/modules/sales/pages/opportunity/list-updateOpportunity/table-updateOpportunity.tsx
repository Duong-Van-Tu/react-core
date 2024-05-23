/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TableCustom } from '@/components/table';
import { updateOpportunityColumns } from '@/modules/sales/pages/opportunity/columns/update-opportunity.column';
import { CustomIcon } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { getTenant } from '@/utils/common';
import { useModalOpportunity } from '@/modules/sales/components/modals/opportunity';
import { ModalOpportunityType } from '@/modules/sales/enum/opportunity.enum';

export function TableUpdateOpportunity() {
  const navigate = useNavigate();
  const tenant = getTenant();
  const { openModal } = useModalOpportunity();

  return (
    <div css={rootStyle}>
      <div css={containerStyle}>
        <h3 css={titleStyle}>Cập nhật cơ hội</h3>
        <div css={subTitleStyle}>
          <span>Lần cập nhật gần nhất:</span>
          <span> 11:00 - 20/04/2024</span>
          <span css={dotIconStyle}>
            <CustomIcon color="rgba(84, 104, 129, 1)" width={10} height={10} type="dot" />
          </span>
          <Link css={historyLinkStyle} to="/sales/opportunity/update-opportunity/update-history">
            Xem lịch sử
          </Link>
        </div>
        <Space direction="vertical">
          <Button css={closeStyle} onClick={() => navigate(`/sales/opportunity?tenant=${tenant}`)}>
            <CustomIcon color="rgba(0, 0, 0, 1)" width={16} height={16} type="close" />
            <LocaleFormatter id="title.exit" />
          </Button>
          <Button
            onClick={() => openModal(ModalOpportunityType.CreateUpdateOpportunity)}
            type="primary"
            css={addBtnStyle}
            iconPosition="start"
            size="large"
          >
            <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />{' '}
            <span>Thêm cập nhật</span>
          </Button>
        </Space>
        <TableCustom
          css={tableStyle}
          columns={updateOpportunityColumns}
          dataSource={[]}
          loading={false}
          rowKey={(record) => record.key}
          pagination={{ current: 1, pageSize: 5 }}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
}

const rootStyle = css`
  display: flex;
  justify-content: center;
  margin: 4rem 0;
`;

const containerStyle = css`
  max-width: 1200px;
  position: relative;
`;

const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.6rem;
  font-weight: 500;
`;

const subTitleStyle = css`
  margin-top: 1rem;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 300;
`;

const tableStyle = css`
  margin-top: 2.6rem;
`;

const dotIconStyle = css`
  margin: 0 8px;
`;

const historyLinkStyle = css`
  &:hover {
    text-decoration: underline;
    color: #2f88ed;
  }
`;

const addBtnStyle = css`
  position: absolute;
  right: 0;
  top: 4.8rem;
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
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
