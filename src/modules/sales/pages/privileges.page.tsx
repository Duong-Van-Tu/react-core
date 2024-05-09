/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { TableProps } from 'antd';

import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { DataPrivilegesType } from '../type.sale';
import { PrivilegesDropdown } from '../components/dropdown/privileges.dropdown';

type ColumnsType<T> = TableProps<T>['columns'];
const data: DataPrivilegesType[] = [
  {
    key: 1,
    beneficiaryName: 'beneficiaryName',
    fixedMonthlySalary: 'fixedMonthlySalary',
    totalTargetVariableSalary: 'totalTargetVariableSalary',
    actualVariableSalary: 'actualVariableSalary',
    status: 'status',
  },
];
export default function PrivilegesPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const columns: ColumnsType<DataPrivilegesType> = [
    {
      title: formatMessage({ id: 'table.column.privileges.beneficiaryName' }),
      dataIndex: 'beneficiaryName',
      render: (beneficiaryName) => beneficiaryName,
    },
    {
      title: formatMessage({ id: 'table.column.privileges.fixedMonthlySalary' }),
      dataIndex: 'fixedMonthlySalary',
      render: (fixedMonthlySalary) => fixedMonthlySalary,
    },
    {
      title: formatMessage({ id: 'table.column.privileges.totalTargetVariableSalary' }),
      dataIndex: 'totalTargetVariableSalary',
      render: (totalTargetVariableSalary) => totalTargetVariableSalary,
    },
    {
      title: formatMessage({ id: 'table.column.privileges.actualVariableSalary' }),
      dataIndex: 'actualVariableSalary',
      render: (actualVariableSalary) => actualVariableSalary,
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
      render: () => <PrivilegesDropdown />,
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
