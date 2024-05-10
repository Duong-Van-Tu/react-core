/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { DataPrivilegesType } from './type.privileges';
import { myPrivilegesColumns } from './columns/my-privileges.column';
import { Tabs, TabsProps } from 'antd';

const myData: DataPrivilegesType[] = [
  {
    key: 1,
    beneficiaryName: 'beneficiaryName',
    fixedMonthlySalary: 'fixedMonthlySalary',
    totalTargetVariableSalary: 'totalTargetVariableSalary',
    actualVariableSalary: 'actualVariableSalary',
    status: 'status',
  },
];

const employeeData: DataPrivilegesType[] = [
  {
    key: 1,
    beneficiaryName: 'beneficiaryName employee',
    fixedMonthlySalary: 'fixedMonthlySalary employee',
    totalTargetVariableSalary: 'totalTargetVariableSalary employee',
    actualVariableSalary: 'actualVariableSalary employee',
    status: 'status employee',
  },
];

export default function PrivilegesPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'title.tab.privileges.my' }),
      children: (
        <TableCustom
          columns={myPrivilegesColumns}
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
      label: formatMessage({ id: 'title.tab.privileges.employee' }),
      children: (
        <TableCustom
          columns={myPrivilegesColumns}
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
          vi_VN: 'Cơ hội',
          en_US: 'Privileges',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return (
    <Fragment>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.privileges' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.privileges' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>10 {formatMessage({ id: 'title.document.privileges' })}</span>
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
