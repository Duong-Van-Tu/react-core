import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { OpportunityDropdown } from '@/modules/sales/components/dropdown/opportunity.dropdown';
import dayjs from 'dayjs';
import { Message } from '@/components/message';
import { StatusOpportunity } from '@/modules/sales/enum/status.enum';

type ColumnsType<T> = TableProps<T>['columns'];
export const opportunityColumns: ColumnsType<DataOpportunityType> = [
  {
    title: <LocaleFormatter id="table.column.customers" />,
    dataIndex: 'customerName',
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.customerNeeds" />,
    dataIndex: 'need',
    render: (customerNeeds) => customerNeeds,
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.decisionMakers" />,
    dataIndex: 'accountable',
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.budget" />,
    dataIndex: 'budget',
    render: (budget) => budget,
    width: '8%',
  },
  {
    title: <LocaleFormatter id="table.column.opportunity.expectedTime" />,
    dataIndex: 'estimatedTime',
    render: (value) => dayjs(value).format('DD/MM/YYYY'),
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
    title: 'Giá vốn dự kiến',
    dataIndex: 'estimatedMoney',
  },
  {
    title: 'Hoa hồng cho người tư vấn',
    dataIndex: 'commissionMoney',
  },
  {
    title: 'Đối thủ 1',
    dataIndex: 'opponent1',
  },
  {
    title: 'Đối thủ 1',
    dataIndex: 'opponent2',
  },
  {
    title: 'Chiến lược của AT&A',
    dataIndex: 'strategy',
  },
  {
    title: 'Lần tương tác gần nhất giữa AT&A và khách hàng ',
    dataIndex: 'lastTimeInteract',
  },
  {
    title: 'Đánh giá khả năng thắng',
    dataIndex: 'winningOppotunity',
  },
  {
    title: 'Trạng thái',
    align: 'center',
    dataIndex: ['opportunityStatus', 'name'],
    render: (__, record) => {
      let messageType: MessageType;
      switch (record.opportunityStatus?.code) {
        case StatusOpportunity.Active:
          messageType = 'success';
          break;
        case StatusOpportunity.OnHold:
          messageType = 'info';
          break;
        case StatusOpportunity.Fail:
        case StatusOpportunity.Close:
          messageType = 'error';
          break;
        default:
          messageType = 'warning';
      }
      return (
        <Message hasBackground type={messageType}>
          {record.opportunityStatus?.name!}
        </Message>
      );
    },
  },
  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <OpportunityDropdown data={record} />,
  },
];
