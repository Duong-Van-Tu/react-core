/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { DataKPIType } from './type.kpi';
import { myKPIColumns } from './columns/my-kpi.column';
import { Tabs, TabsProps } from 'antd';
import { employeeKPIColumns } from './columns/employee-kpi.column';

const myData: DataKPIType[] = [
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
const employeeData: DataKPIType[] = [
  {
    key: 1,
    proposer: 'proposer1 Employee',
    criteria: 'criteria1 Employee',
    objective: 'objective1 Employee',
    reality: 'reality1 Employee',
    targetPoint: 'targetPoint1 Employee',
    implementationTime: 'implementationTime1 Employee',
    calculationMethod: 'calculationMethod1 Employee',
  },
];

export default function KPIPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'title.tab.kpi.my' }),
      children: (
        <TableCustom
          columns={myKPIColumns}
          dataSource={myData}
          loading={false}
          rowKey={(record) => record.key}
          pagination={{ current: 1, pageSize: 7 }}
          scroll={{ x: 1450 }}
        />
      ),
    },
    {
      key: '2',
      label: formatMessage({ id: 'title.tab.kpi.employee' }),
      children: (
        <TableCustom
          columns={employeeKPIColumns}
          dataSource={employeeData}
          loading={false}
          rowKey={(record) => record.key}
          pagination={{ current: 1, pageSize: 7 }}
          scroll={{ x: 1450 }}
        />
      ),
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

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
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
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
