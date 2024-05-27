import { TableProps } from 'antd';
import { LocaleFormatter } from '@/components/locale-formatter';
import { ProjectDropdown } from '@/modules/category/components/dropdown/project.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
export const projectColumns: ColumnsType<DataProjectType> = [
  {
    title: <LocaleFormatter id="table.column.projectID" />,
    dataIndex: 'code',
    render: (code) => code,
  },

  {
    title: <LocaleFormatter id="table.column.projectName" />,
    dataIndex: 'name',
    render: (name) => name,
  },

  {
    title: <LocaleFormatter id="table.column.projectResult" />,
    dataIndex: 'result',
    render: (result) => result,
  },

  {
    title: <LocaleFormatter id="table.column.projectType" />,
    dataIndex: 'type',
    render: (type) => type,
  },

  {
    title: <LocaleFormatter id="table.column.projectPoint" />,
    dataIndex: 'point',
    render: (point) => point,
  },

  {
    title: <LocaleFormatter id="table.column.status" />,
    dataIndex: ['projectStatus'],
    render: (status: ProjectStatus) => status.name,
  },

  {
    title: <LocaleFormatter id="table.column.projectNote" />,
    dataIndex: 'note',
    render: (note) => note,
  },

  {
    title: <LocaleFormatter id="table.column.projectService" />,
    dataIndex: 'service',
    render: (service) => service,
  },

  {
    title: <LocaleFormatter id="table.column.projectApplicationUser" />,
    dataIndex: 'applicationUser',
    render: (applicationUser) => applicationUser,
  },

  {
    title: '',
    dataIndex: 'calculationMethod',
    fixed: 'right',
    width: '6%',
    render: (__, record) => <ProjectDropdown data={record} />,
  },
];
