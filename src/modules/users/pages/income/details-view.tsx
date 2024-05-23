/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { ticketIncomeDetailsColumns } from './column/ticket-income-details.column';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';

export const TicketIncomeDetails = () => {
  const { formatMessage } = useLocale();

  const { dataDetailIncome, pagination } = useRootSelector((state) => state.user.income);

  return (
    <div css={containerStyle}>
      <div css={closeStyle}>
        <CustomIcon width={12} height={14} type="prev" />
        <span
          css={goBackLinkStyle}
          onClick={() => {
            window.history.back();
          }}
        >
          {formatMessage({ id: 'title.back' })}
        </span>
      </div>
      <h1 css={titleStyle}>{formatMessage({ id: 'title.document.income-ticket' })}</h1>
      <div css={tableCustomStyle}>
        <TableCustom
          columns={ticketIncomeDetailsColumns}
          dataSource={dataDetailIncome}
          loading={false}
          rowKey={(record) => record.key}
          pagination={{
            current: pagination?.pageIndex,
            pageSize: Pagination.PAGESIZE,
            total: pagination?.totalRecords,
            position: ['bottomCenter'],
            // onChange: (page) => {
            //   getListIncome({
            //     pageIndex: page,
            //     pageSize: Pagination.PAGESIZE,
            //   });
            // },
          }}
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
  cursor: pointer;
  font-size: 1.4rem;
  color: #000;
`;
const tableCustomStyle = css`
  padding: 0.32rem 0;
`;
