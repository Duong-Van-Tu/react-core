/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { DataOpportunityType } from './type.opportunity';
import { opportunityColumns } from './columns/opportunity.column';
import { ModalOpportunityProvider } from '../../components/modals/opportuity';

const data: DataOpportunityType[] = [
  {
    key: 1,
    customers: 'customers',
    decisionMakers: 'decisionMakers',
    technicalLeads: 'technicalLeads',
    beneficiaries: 'beneficiaries',
    customerNeeds: 'customerNeeds',
    expectedTime: 'expectedTime',
    budget: 'budget',
  },
];

export default function OpportunityPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

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
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.opportunity' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.opportunity' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>10 {formatMessage({ id: 'title.document.opportunity' })}</span>
      </div>
      <TableCustom
        columns={opportunityColumns}
        dataSource={data}
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
  margin-top: 0.4rem;
  gap: 4px;
  font-size: 1.4rem;
`;
const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2.3rem;
  font-weight: 600;
`;
