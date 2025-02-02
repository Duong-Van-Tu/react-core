import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { QuestionGainsDropdown } from '@/modules/category/components/dropdown/question-gains.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const questionGainsColumns: ColumnsType<DataQuestionGainsType> = [
  {
    title: <LocaleFormatter id="table.column.questionGainsCode" />,
    dataIndex: 'code',
    render: (code) => code,
  },

  {
    title: <LocaleFormatter id="table.column.questionGainsQuestion" />,
    dataIndex: 'content',
    render: (content) => content,
  },

  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <QuestionGainsDropdown data={record} />,
  },
];
