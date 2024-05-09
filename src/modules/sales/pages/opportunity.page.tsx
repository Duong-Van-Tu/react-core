/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { TableProps } from 'antd';

import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { DataOpportunityType } from '../type.sale';
import { OpportunityDropdown } from '../components/dropdown/opportunity.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
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

  const columns: ColumnsType<DataOpportunityType> = [
    {
      title: formatMessage({ id: 'table.column.customers' }),
      dataIndex: 'customers',
      render: (customers) => customers,
    },
    {
      title: formatMessage({ id: 'table.column.opportunity.decisionMakers' }),
      dataIndex: 'decisionMakers',
      render: (decisionMakers) => decisionMakers,
    },
    {
      title: formatMessage({ id: 'table.column.opportunity.technicalLeads' }),
      dataIndex: 'technicalLeads',
      render: (technicalLeads) => technicalLeads,
    },
    {
      title: formatMessage({ id: 'table.column.opportunity.beneficiaries' }),
      dataIndex: 'beneficiaries',
      render: (beneficiaries) => beneficiaries,
    },
    {
      title: formatMessage({ id: 'table.column.opportunity.customerNeeds' }),
      dataIndex: 'customerNeeds',
      render: (customerNeeds) => customerNeeds,
    },
    {
      title: formatMessage({ id: 'table.column.opportunity.expectedTime' }),
      dataIndex: 'expectedTime',
      render: (expectedTime) => expectedTime,
    },
    {
      title: formatMessage({ id: 'table.column.opportunity.budget' }),
      dataIndex: 'budget',
      render: (budget) => budget,
      width: '8%',
    },
    {
      title: '',
      dataIndex: 'calculationMethod',
      fixed: 'right',
      width: '6%',
      render: () => <OpportunityDropdown />,
    },
  ];

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
    <Fragment>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.opportunity' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.opportunity' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>10 {formatMessage({ id: 'title.document.opportunity' })}</span>
      </div>
      <TableCustom
        columns={columns}
        dataSource={data}
        loading={false}
        rowKey={(record) => record.key}
        pagination={{ current: 1, pageSize: 7 }}
        scroll={{ x: 1450 }}
      />
    </Fragment>
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
