import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { OpportunityDropdown } from '@/modules/sales/components/dropdown/opportunity.dropdown';
import dayjs from 'dayjs';

type ColumnsType<T> = TableProps<T>['columns'];
export const opportunityColumns: ColumnsType<DataOpportunityType> = [
  {
    title: <LocaleFormatter id="table.column.customers" />,
    dataIndex: 'customerName',
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.decisionMakers" />,
    dataIndex: 'accountable',
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.technicalLeads" />,
    dataIndex: 'technicalLead',
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.beneficiaries" />,
    dataIndex: 'beneficiary',
    render: (beneficiaries) => beneficiaries,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.customerNeeds" />,
    dataIndex: 'need',
    render: (customerNeeds) => customerNeeds,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.expectedTime" />,
    dataIndex: 'estimatedTime',
    render: (value) => dayjs(value).format('DD/MM/YYYY'),
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
