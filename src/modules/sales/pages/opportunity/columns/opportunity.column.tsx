import { TableProps } from 'antd';
import { DataOpportunityType } from '../type.opportunity';
import { LocaleFormatter } from '@/components/locale-formatter';
import { OpportunityDropdown } from '@/modules/sales/components/dropdown/opportunity.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const opportunityColumns: ColumnsType<DataOpportunityType> = [
  {
    title: <LocaleFormatter id="table.column.customers" />,
    dataIndex: 'customers',
    render: (customers) => customers,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.decisionMakers" />,
    dataIndex: 'decisionMakers',
    render: (decisionMakers) => decisionMakers,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.technicalLeads" />,
    dataIndex: 'technicalLeads',
    render: (technicalLeads) => technicalLeads,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.beneficiaries" />,
    dataIndex: 'beneficiaries',
    render: (beneficiaries) => beneficiaries,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.customerNeeds" />,
    dataIndex: 'customerNeeds',
    render: (customerNeeds) => customerNeeds,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.expectedTime" />,
    dataIndex: 'expectedTime',
    render: (expectedTime) => expectedTime,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.budget" />,
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
