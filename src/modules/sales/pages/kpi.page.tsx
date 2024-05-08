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
    proposer: 'proposer1',
    criteria: 'criteria1',
    objective: 'objective1',
    reality: 'reality1',
    targetPoint: 'targetPoint1',
    implementationTime: 'implementationTime1',
    calculationMethod: 'calculationMethod1',
  },
  {
    key: 2,
    proposer: 'proposer2',
    criteria: 'criteria2',
    objective: 'objective2',
    reality: 'reality2',
    targetPoint: 'targetPoint2',
    implementationTime: 'implementationTime2',
    calculationMethod: 'calculationMethod2',
  },
  {
    key: 3,
    proposer: 'proposer3',
    criteria: 'criteria3',
    objective: 'objective3',
    reality: 'reality3',
    targetPoint: 'targetPoint3',
    implementationTime: 'implementationTime3',
    calculationMethod: 'calculationMethod3',
  },
  {
    key: 4,
    proposer: 'proposer4',
    criteria: 'criteria4',
    objective: 'objective4',
    reality: 'reality4',
    targetPoint: 'targetPoint4',
    implementationTime: 'implementationTime4',
    calculationMethod: 'calculationMethod4',
  },
  {
    key: 5,
    proposer: 'proposer5',
    criteria: 'criteria5',
    objective: 'objective5',
    reality: 'reality5',
    targetPoint: 'targetPoint5',
    implementationTime: 'implementationTime5',
    calculationMethod: 'calculationMethod5',
  },
  {
    key: 6,
    proposer: 'proposer6',
    criteria: 'criteria6',
    objective: 'objective6',
    reality: 'reality6',
    targetPoint: 'targetPoint6',
    implementationTime: 'implementationTime6',
    calculationMethod: 'calculationMethod6',
  },
  {
    key: 7,
    proposer: 'proposer7',
    criteria: 'criteria7',
    objective: 'objective7',
    reality: 'reality7',
    targetPoint: 'targetPoint7',
    implementationTime: 'implementationTime7',
    calculationMethod: 'calculationMethod7',
  },
  {
    key: 8,
    proposer: 'proposer8',
    criteria: 'criteria8',
    objective: 'objective8',
    reality: 'reality8',
    targetPoint: 'targetPoint8',
    implementationTime: 'implementationTime8',
    calculationMethod: 'calculationMethod8',
  },
  {
    key: 9,
    proposer: 'proposer9',
    criteria: 'criteria9',
    objective: 'objective9',
    reality: 'reality9',
    targetPoint: 'targetPoint9',
    implementationTime: 'implementationTime9',
    calculationMethod: 'calculationMethod9',
  },
  {
    key: 10,
    proposer: 'proposer10',
    criteria: 'criteria10',
    objective: 'objective10',
    reality: 'reality10',
    targetPoint: 'targetPoint10',
    implementationTime: 'implementationTime10',
    calculationMethod: 'calculationMethod10',
  },
  {
    key: 11,
    proposer: 'proposer11',
    criteria: 'criteria11',
    objective: 'objective11',
    reality: 'reality11',
    targetPoint: 'targetPoint11',
    implementationTime: 'implementationTime11',
    calculationMethod: 'calculationMethod11',
  },
  {
    key: 12,
    proposer: 'proposer12',
    criteria: 'criteria12',
    objective: 'objective12',
    reality: 'reality12',
    targetPoint: 'targetPoint12',
    implementationTime: 'implementationTime12',
    calculationMethod: 'calculationMethod12',
  },
  {
    key: 13,
    proposer: 'proposer13',
    criteria: 'criteria13',
    objective: 'objective13',
    reality: 'reality13',
    targetPoint: 'targetPoint13',
    implementationTime: 'implementationTime13',
    calculationMethod: 'calculationMethod13',
  },
  {
    key: 14,
    proposer: 'proposer14',
    criteria: 'criteria14',
    objective: 'objective14',
    reality: 'reality14',
    targetPoint: 'targetPoint14',
    implementationTime: 'implementationTime14',
    calculationMethod: 'calculationMethod14',
  },
  {
    key: 15,
    proposer: 'proposer15',
    criteria: 'criteria15',
    objective: 'objective15',
    reality: 'reality15',
    targetPoint: 'targetPoint15',
    implementationTime: 'implementationTime15',
    calculationMethod: 'calculationMethod15',
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
