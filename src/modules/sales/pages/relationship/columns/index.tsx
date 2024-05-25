import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { RelationshipDropdown } from '@/modules/sales/components/dropdown/relationship.dropdown';
import { Message } from '@/components/message';
import { StatusRelationship } from '@/modules/sales/enum/status.enum';

type ColumnsType<T> = TableProps<T>['columns'];
const columns: ColumnsType<DataRelationshipType> = [
  {
    title: 'Tên công ty',
    dataIndex: 'customer',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'customerName',
  },
  {
    title: <LocaleFormatter id="table.column.relationship.jobPosition" />,
    dataIndex: 'position',
  },
  {
    title: 'Mức độ quan hệ hiện tại',
    dataIndex: 'currentRelationshipLevel',
  },
  {
    title: <LocaleFormatter id="table.column.relationship.targetLevel" />,
    dataIndex: 'targetRelationshipLevel',
  },
  {
    title: <LocaleFormatter id="table.column.relationship.upgrade" />,
    dataIndex: 'reason',
  },
  {
    title: <LocaleFormatter id="table.column.relationship.responsiblePerson" />,
    dataIndex: ['applicationUser', 'firstName'],
  },
  {
    title: <LocaleFormatter id="table.column.targetPoint" />,
    dataIndex: 'point',
  },
  {
    title: 'Điểm thực tế',
    dataIndex: 'actualPoint',
  },
  {
    title: <LocaleFormatter id="table.column.status" />,
    dataIndex: ['relationshipStatus', 'name'],
    align: 'center',
    render: (__, status) => {
      let messageType: MessageType;
      switch (status.relationshipStatus?.code) {
        case StatusRelationship.Completed:
        case StatusRelationship.Confirm:
          messageType = 'success';
          break;
        case StatusRelationship.Processing:
          messageType = 'info';
          break;
        default:
          messageType = 'warning';
      }

      return status.relationshipStatus ? (
        <Message hasBackground type={messageType}>
          {status.relationshipStatus.name}
        </Message>
      ) : (
        ''
      );
    },
  },
  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <RelationshipDropdown data={record} />,
  },
];

export default columns;
