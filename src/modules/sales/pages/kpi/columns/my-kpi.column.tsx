import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { KPIDropdown } from '@/modules/sales/components/dropdown/kpi.dropdown';
import dayjs from 'dayjs';
import { Message } from '@/components/message';
import { Status } from '@/modules/sales/enum/status.enum';

type ColumnsType<T> = TableProps<T>['columns'];

export const myKPIColumns: ColumnsType<DataKPIType> = [
  {
    title: <LocaleFormatter id="table.column.kpi.proposer" />,
    dataIndex: ['userSuggest'],
    render: (user: UserSuggest) => {
      return `${user.firstName} ${user.lastName}`;
    },
  },
  {
    title: <LocaleFormatter id="table.column.kpi.criteria" />,
    dataIndex: 'criteria',
    render: (criteria) => criteria,
  },
  {
    title: <LocaleFormatter id="table.column.kpi.objective" />,
    dataIndex: 'targetKPI',
  },
  {
    title: <LocaleFormatter id="table.column.kpi.reality" />,
    dataIndex: 'actualKPI',
  },
  {
    title: <LocaleFormatter id="table.column.targetPoint" />,
    dataIndex: 'targetPoint',
  },
  {
    title: <LocaleFormatter id="table.column.kpi.implementationTime" />,
    dataIndex: 'implementationTime',
    render: (__, record) => {
      return `${dayjs(record.startTime).format('DD/MM/YYYY')} đến ${dayjs(record.endTime).format('DD/MM/YYYY')} `;
    },
  },
  {
    title: <LocaleFormatter id="table.column.kpi.calculationMethod" />,
    dataIndex: 'calculate',
  },
  {
    title: <LocaleFormatter id="table.column.kpi.actualPoint" />,
    dataIndex: 'actualPoint',
  },
  {
    title: 'Trạng thái',
    align: 'center',
    dataIndex: ['goalStatus', 'name'],
    render: (__, record) => {
      let messageType: MessageType;
      switch (record.goalStatus?.code) {
        case Status.Completed:
        case Status.Updated:
          messageType = 'success';
          break;
        case Status.Request:
        case Status.Processing:
          messageType = 'info';
          break;
        case Status.Failed:
          messageType = 'error';
          break;
        default:
          messageType = 'warning';
      }
      return (
        <Message hasBackground type={messageType}>
          {record.goalStatus?.name ?? ''}
        </Message>
      );
    },
  },
  {
    title: '',
    fixed: 'right',
    width: '6%',
    render: () => <KPIDropdown />,
  },
];
