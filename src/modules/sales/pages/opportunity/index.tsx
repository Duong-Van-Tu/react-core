/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { opportunityColumns } from './columns/opportunity.column';
import { ModalOpportunityProvider } from '../../components/modals/opportunity';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useOpportunity } from '../../services/opportunity.service';
import { Pagination } from '@/constants/pagination';
import { Search, SearchParams } from '@/components/search';
import { useRootSelector } from '@/hooks/selector.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { getTenant } from '@/utils/common';

export default function OpportunityPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const { getAllOpportunity, getAllStatusOpportunity } = useOpportunity();
  const [loading, loadingStatus] = useWatchLoading(
    ['get-opportunity', true],
    ['status-opportunity', true],
  );
  const { pagination, status, data, totalExtend } = useRootSelector(
    (state) => state.sale.opportunity,
  );

  const handleSearch = ({ textSearch, statusId, time }: SearchParams) => {
    getAllOpportunity({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      statusId,
      time,
    });
  };

  useEffect(() => {
    getAllOpportunity({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
    });
    getAllStatusOpportunity();
  }, [getAllOpportunity, getAllStatusOpportunity]);

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Sale',
          en_US: 'Sale',
        },
      },
      {
        title: {
          vi_VN: 'Cơ hội',
          en_US: 'Opportunity',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return (
    <ModalOpportunityProvider>
      <div css={rootStyle}>
        <h3 css={titleStyle}>{formatMessage({ id: 'title.document.opportunity' })}</h3>
        <div css={subTitleStyle}>
          <span>{formatMessage({ id: 'title.document.opportunity' })}</span>
          <CustomIcon width={8} height={8} type="dot" />
          <span>
            {totalExtend ?? 0} {formatMessage({ id: 'title.document.opportunity' })}
          </span>
        </div>
        <Button
          onClick={() => navigate(`add-opportunity?tenant=${getTenant()}`)}
          type="primary"
          css={addKOpportunityStyle}
          iconPosition="start"
          size="large"
        >
          <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />{' '}
          <span>Thêm cơ hội</span>
        </Button>
        <div css={searchContainer}>
          <Search onSearch={handleSearch} loadingStatus={loadingStatus} status={status as any} />
        </div>
        <TableCustom
          columns={opportunityColumns}
          dataSource={data}
          loading={loading}
          rowKey={(record) => record.id}
          pagination={{
            current: pagination?.pageIndex,
            pageSize: Pagination.PAGESIZE,
            total: pagination?.totalRecords,
            position: ['bottomCenter'],
            onChange: (page) => {
              getAllOpportunity({
                pageIndex: page,
                pageSize: Pagination.PAGESIZE,
              });
            },
          }}
          scroll={{ x: 2500 }}
        />
      </div>
    </ModalOpportunityProvider>
  );
}

const rootStyle = css`
  position: relative;
`;

const subTitleStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2.3rem;
  font-weight: 600;
`;

const addKOpportunityStyle = css`
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  position: absolute;
  top: 1.4rem;
  right: 0;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const searchContainer = css`
  margin: 2.6rem 0;
`;
