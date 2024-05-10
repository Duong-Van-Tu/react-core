/** @jsxImportSource @emotion/react */
import { Fragment, useEffect } from 'react';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { CustomIcon } from '@/components/icons';
import { DataRelationshipType } from './type.relationship';
import { myRelationshipColumns } from './columns/my-relationship.column';
import { Tabs, TabsProps } from 'antd';
import { employeeRelationshipColumns } from './columns/employee-relationship';

const myData: DataRelationshipType[] = [
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

const employeeData: DataRelationshipType[] = [
  {
    key: 1,
    jobPosition: 'jobPosition employee',
    upgrade: 'upgrade employee',
    responsiblePerson: 'responsiblePerson employee',
    targetLevel: 'targetLevel employee',
    status: 'status employee',
    targetPoint: 'targetPoint employee',
  },
];

export default function RelationshipPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'title.tab.relationship.my' }),
      children: (
        <TableCustom
          columns={myRelationshipColumns}
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
      label: formatMessage({ id: 'title.tab.relationship.employee' }),
      children: (
        <TableCustom
          columns={employeeRelationshipColumns}
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
