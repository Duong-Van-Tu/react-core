/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { ticketIncomeDetailsColumns } from './column/ticket-income-details.column';

const data: any = [
  {
    key: 1,
    content: '[VRB_SLW] Tạo reel',
    expectedAmount: '0',
    actualAmount: '136.000 VND',
    object: 'huynq',
    CPType: 'CP.Sanxuat',
    projectName: 'VRB.2023-2.trabdt.Dbcare',
    spentTime: '31/01/2024',
  },
  {
    key: 2,
    content: '[VRB_SLW] Tạo reel',
    expectedAmount: '0',
    actualAmount: '136.000 VND',
    object: 'huynq',
    CPType: 'CP.Sanxuat',
    projectName: 'VRB.2023-2.trabdt.Dbcare',
    spentTime: '31/01/2024',
  },
  {
    key: 3,
    content: '[VRB_SLW] Tạo reel',
    expectedAmount: '0',
    actualAmount: '136.000 VND',
    object: 'huynq',
    CPType: 'CP.Sanxuat',
    projectName: 'VRB.2023-2.trabdt.Dbcare',
    spentTime: '31/01/2024',
  },
];
export const TicketIncomeDetails = () => {
  const { formatMessage } = useLocale();
  return (
    <div css={containerStyle}>
      <div css={closeStyle}>
        <CustomIcon width={12} height={14} type="prev" />
        <Link css={goBackLinkStyle} to="/personnel/infor-income/">
          {formatMessage({ id: 'title.back' })}
        </Link>
      </div>
      <h1 css={titleStyle}>Chi tiết thu nhập theo ticket</h1>
      <div css={tableCustomStyle}>
        <TableCustom
          columns={ticketIncomeDetailsColumns}
          dataSource={data}
          loading={false}
          rowKey={(record) => record.key}
          pagination={{ current: 1, pageSize: 3 }}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  max-width: 120rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

const closeStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  margin-top: 3.7rem;
  svg path {
    fill: rgba(0, 0, 0, 1);
  }
`;

const titleStyle = css`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin: 8rem 0;
`;

const goBackLinkStyle = css`
  font-size: 1.4rem;
  color: #000;
`;
const tableCustomStyle = css`
  padding: 0.32rem 0;
`;
