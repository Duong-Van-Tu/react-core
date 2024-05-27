import { LocaleFormatter } from '@/components/locale-formatter';
import { TableProps } from 'antd';

type ColumnsType<T> = TableProps<T>['columns'];

export const organizeColumns: ColumnsType<DataUserType> = [
  {
    title: <LocaleFormatter id="table.column.organize.empCode" />,
  },
  {
    title: <LocaleFormatter id="table.column.organize.fullName" />,
  },
  {
    title: <LocaleFormatter id="table.column.organize.position" />,
  },
  {
    title: <LocaleFormatter id="table.column.organize.positionInformation" />,
  },
  {
    title: <LocaleFormatter id="table.column.organize.interests" />,
  },

  {
    title: <LocaleFormatter id="table.column.organize.target" />,
  },
  {
    title: <LocaleFormatter id="table.column.organize.autodidactic" />,
  },
  {
    title: <LocaleFormatter id="table.column.organize.manualDocument" />,
  },
];
