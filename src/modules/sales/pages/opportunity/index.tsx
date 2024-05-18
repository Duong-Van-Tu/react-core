/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { opportunityColumns } from './columns/opportunity.column';
import { ModalOpportunityProvider } from '../../components/modals/opportuity';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useOpportunity } from '../../services/opportunity.service';
import { Pagination } from '@/constants/pagination';
import { RoleType } from '@/enum/role.enum';
import { Search, SearchParams } from '@/components/search';
import { useRootSelector } from '@/hooks/selector.hook';

export default function OpportunityPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const { getAllOpportunity, getAllStatusOpportunity } = useOpportunity();
  const { pagination, status } = useRootSelector((state) => state.sale.opportunity);

  const handleSearch = ({ textSearch, statusId, time }: SearchParams) => {
    getAllOpportunity({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      statusId,
      time,
      roleType: RoleType.MySelf,
    });
  };

  useEffect(() => {
    getAllOpportunity({
      pageIndex: Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      roleType: RoleType.MySelf,
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
          vi_VN: 'Quyền lợi',
          en_US: 'Opportunity',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return (
    <ModalOpportunityProvider>
      <div css={subTitleStyle}>
        <div>
          <h3 css={titleStyle}>{formatMessage({ id: 'title.document.opportunity' })}</h3>
          <span>{formatMessage({ id: 'title.document.opportunity' })}</span>
          <CustomIcon width={8} height={8} type="dot" />
          <span>10 {formatMessage({ id: 'title.document.opportunity' })}</span>
        </div>
        <div>
          <Button
            onClick={() => navigate('/sales/opportunity/add-opportunity')}
            type="primary"
            css={addKOpportunitytnStyle}
            iconPosition="start"
            size="middle"
          >
            <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />{' '}
            <span>Thêm cơ hội</span>
          </Button>
        </div>
      </div>

      <div css={searchContainer}>
        <Search onSearch={handleSearch} status={status} />
      </div>

      <TableCustom
        columns={opportunityColumns}
        dataSource={[]}
        loading={false}
        rowKey={(record) => record.key}
        pagination={{ current: 1, pageSize: 7 }}
        scroll={{ x: 1450 }}
      />
    </ModalOpportunityProvider>
  );
}

const subTitleStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.4rem;
  gap: 4px;
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;
const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2.3rem;
  font-weight: 600;
`;

const addKOpportunitytnStyle = css`
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const searchContainer = css`
  margin: 2.6rem 0;
`;
