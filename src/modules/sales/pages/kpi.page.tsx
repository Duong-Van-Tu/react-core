/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { Button, Dropdown, TableProps } from 'antd';
import type { MenuProps } from 'antd';
import { TableCustom } from '@/components/table';
import { DataKPIType } from '../type.sale';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { css } from '@emotion/react';

type ColumnsType<T> = TableProps<T>['columns'];
const data: DataKPIType[] = [
  {
    key: 1,
    proposer: 'proposer',
    criteria: 'criteria',
    objective: 'objective',
    reality: 'reality',
    targetPoint: 'targetPoint',
    implementationTime: 'implementationTime',
    calculationMethod: 'calculationMethod',
  },
  {
    key: 2,
    proposer: 'proposer',
    criteria: 'criteria',
    objective: 'objective',
    reality: 'reality',
    targetPoint: 'targetPoint',
    implementationTime: 'implementationTime',
    calculationMethod: 'calculationMethod',
  },
];

export default function KPIPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>Gửi yêu cầu chỉnh sửa</span>,
    },
    {
      key: '2',
      label: <span>Chốt KPI</span>,
    },
    {
      key: '3',
      label: <span>Đánh giá</span>,
    },
    {
      key: '4',
      label: <span>Xem báo cáo</span>,
    },
  ];

  const columns: ColumnsType<DataKPIType> = [
    {
      title: 'Key',
      dataIndex: 'key',
      render: (key) => key,
    },
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
      title: formatMessage({ id: 'table.column.kpi.targetPoint' }),
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
      render: () => (
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button css={actionIconBtn}>
            <CustomIcon type="three-dot" width={16} height={18} />
          </Button>
        </Dropdown>
      ),
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

  return <TableCustom columns={columns} data={data} loading={false} />;
}

const actionIconBtn = css`
  background: none;
  border: none;
  box-shadow: unset;
  padding: 0;
`;
