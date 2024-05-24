/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { ticketIncomeDetailsColumns } from './column/ticket-income-details.column';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { Link } from 'react-router-dom';
import { useQuery } from '@/hooks/query.hook';
import { useIncome } from '../../services/income.service';
import { usePermission } from '@/hooks/permission.hook';
import { useEffect } from 'react';
import { useWatchLoading } from '@/hooks/loading.hook';

export default function TicketIncomeDetails() {
  const { formatMessage } = useLocale();

  const { getListIncomeDetail } = useIncome();
  const [loading] = useWatchLoading(['get-list-income-detail', true]);

  const { isAdmin } = usePermission();

  const { dataDetailIncome, pagination } = useRootSelector((state) => state.user.income);

  const query = useQuery();

  useEffect(() => {
    handleViewDetail();
  }, []);

  const handleViewDetail = () => {
    if (isAdmin) {
      getListIncomeDetail({
        userId: query.userId,
        pageIndex: Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
      });
    } else {
      getListIncomeDetail({
        userId: query.userId,
        month: query.month,
        year: query.year,
        pageIndex: Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
      });
    }
  };

  const handleTableChange = (page: number) => {
    if (isAdmin) {
      getListIncomeDetail({
        userId: query.userId,
        pageIndex: page,
        pageSize: Pagination.PAGESIZE,
      });
    } else {
      getListIncomeDetail({
        userId: query.userId,
        month: query.month,
        year: query.year,
        pageIndex: page,
        pageSize: Pagination.PAGESIZE,
      });
    }
  };

  return (
    <div css={containerStyle}>
      <div css={closeStyle}>
        <CustomIcon width={12} height={14} type="prev" />
        <Link to={'/users/income'} css={goBackLinkStyle}>
          {formatMessage({ id: 'title.back' })}
        </Link>
      </div>
      <h1 css={titleStyle}>{formatMessage({ id: 'title.document.income-ticket' })}</h1>
      <div css={tableCustomStyle}>
        <TableCustom
          columns={ticketIncomeDetailsColumns}
          dataSource={dataDetailIncome}
          loading={loading}
          rowKey={(record) => record.key}
          onTableChange={(page) => handleTableChange(page)}
          pagination={{
            current: pagination?.pageIndex,
            pageSize: Pagination.PAGESIZE,
            total: pagination?.totalRecords,
            position: ['bottomCenter'],
          }}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
}

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
