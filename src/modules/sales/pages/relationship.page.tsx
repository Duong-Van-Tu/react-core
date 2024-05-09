/** @jsxImportSource @emotion/react */
import { Fragment, useEffect } from 'react';
import { TableProps } from 'antd';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { DataRelationshipType } from '../type.sale';
import { KPIDropdown } from '../components/dropdown/kpi.dropdown';
import { RelationshipDropdown } from '../components/dropdown/relationship.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
const data: DataRelationshipType[] = [
  {
    key: 1,
    jobPosition: 'jobPosition',
    upgrade: 'upgrade',
    responsiblePerson: 'responsiblePerson',
    targetLevel: 'targetLevel',
    status: 'status',
    targetPoint: 'targetPoint',
  },
];

export default function RelationshipPage() {
  const dispatch = useDispatch();

  const { formatMessage } = useLocale();

  const columns: ColumnsType<DataRelationshipType> = [
    {
      title: formatMessage({ id: 'table.column.relationship.jobPosition' }),
      dataIndex: 'jobPosition',
      render: (jobPosition) => jobPosition,
    },
    {
      title: formatMessage({ id: 'table.column.relationship.targetLevel' }),
      dataIndex: 'targetLevel',
      render: (targetLevel) => targetLevel,
    },
    {
      title: formatMessage({ id: 'table.column.relationship.upgrade' }),
      dataIndex: 'upgrade',
      render: (upgrade) => upgrade,
    },
    {
      title: formatMessage({ id: 'table.column.relationship.responsiblePerson' }),
      dataIndex: 'responsiblePerson',
      render: (responsiblePerson) => responsiblePerson,
    },

    {
      title: formatMessage({ id: 'table.column.targetPoint' }),
      dataIndex: 'targetPoint',
      render: (targetPoint) => targetPoint,
    },
    {
      title: formatMessage({ id: 'table.column.status' }),
      dataIndex: 'status',
      render: (status) => status,
    },
    {
      title: '',
      dataIndex: 'calculationMethod',
      fixed: 'right',
      width: '6%',
      render: () => <RelationshipDropdown />,
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
          vi_VN: 'Mối quan hệ',
          en_US: 'relationship',
        },
      },
    ];

    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return (
    <Fragment>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.relationship' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.relationship' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>10 {formatMessage({ id: 'title.document.relationship' })}</span>
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
