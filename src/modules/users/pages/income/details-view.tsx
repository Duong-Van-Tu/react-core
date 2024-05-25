/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { ticketIncomeDetailsColumns } from './column/ticket-income-details.column';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { useQuery } from '@/hooks/query.hook';
import { useIncome } from '../../services/income.service';
import { usePermission } from '@/hooks/permission.hook';
import { useEffect } from 'react';
import { useWatchLoading } from '@/hooks/loading.hook';
import { Button } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { useNavigate } from 'react-router-dom';
import { getTenant } from '@/utils/common';

export default function TicketIncomeDetails() {
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const tenant = getTenant();

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
      <Button css={closeStyle} onClick={() => navigate(`/users/income?tenant=${tenant}`)}>
        <CustomIcon type="close" width={18} height={18} />
        <LocaleFormatter id="title.exit" />
      </Button>
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
  position: relative;
`;

const closeStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: absolute;
  right: 0;
  top: 3rem;
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
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin: 8rem 0;
`;

const tableCustomStyle = css`
  padding: 0.32rem 0;
`;
