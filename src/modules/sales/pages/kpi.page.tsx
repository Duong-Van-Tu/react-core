/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { TableProps } from 'antd';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { DataKPIType } from '../type.sale';
import { KPIDropdown } from '../components/dropdown/kpi.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
const data: DataKPIType[] = [
  {
    key: 1,
    proposer: 'proposer1',
    criteria: 'criteria1',
    objective: 'objective1',
    reality: 'reality1',
    targetPoint: 'targetPoint1',
    implementationTime: 'implementationTime1',
    calculationMethod: 'calculationMethod1',
  },
];

export default function KPIPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const columns: ColumnsType<DataKPIType> = [
    {
      title: formatMessage({ id: 'table.column.kpi.proposer' }),
      dataIndex: 'proposer',
      render: (proposer) => proposer,
    },
    {
      title: formatMessage({ id: 'table.column.kpi.criteria' }),
      dataIndex: 'criteria',
      render: (criteria) => criteria,
    },
    {
      title: formatMessage({ id: 'table.column.kpi.objective' }),
      dataIndex: 'objective',
      render: (objective) => objective,
    },
    {
      title: formatMessage({ id: 'table.column.kpi.reality' }),
      dataIndex: 'reality',
      render: (reality) => reality,
    },
    {
      title: formatMessage({ id: 'table.column.targetPoint' }),
      dataIndex: 'targetPoint',
      render: (targetPoint) => targetPoint,
    },
    {
      title: formatMessage({ id: 'table.column.kpi.implementationTime' }),
      dataIndex: 'implementationTime',
      render: (implementationTime) => implementationTime,
    },
    {
      title: formatMessage({ id: 'table.column.kpi.calculationMethod' }),
      dataIndex: 'calculationMethod',
      render: (calculationMethod) => calculationMethod,
    },
    {
      title: '',
      dataIndex: 'calculationMethod',
      fixed: 'right',
      width: '6%',
      render: () => <KPIDropdown />,
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
          vi_VN: 'KPI',
          en_US: 'KPI',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return (
    <Fragment>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.kpi' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.kpi' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>10 {formatMessage({ id: 'title.document.kpi' })}</span>
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
