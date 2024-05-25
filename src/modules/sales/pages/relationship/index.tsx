/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { Tabs, TabsProps } from 'antd';
import TableRelationship from './table-relationship';
import { usePermission } from '@/hooks/permission.hook';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@/hooks/query.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { getTenant } from '@/utils/common';
import { RoleType } from '@/enum/role.enum';
import { ModalRelationshipProvider } from '../../components/modals/relationship';

export default function RelationshipPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const { isAdmin, isSaleDirector } = usePermission();
  const tenant = getTenant();
  const totalRecords = useRootSelector((state) => state.sale.relationship.pagination?.totalRecords);
  const { tab: activeKey } = useQuery();

  const items: TabsProps['items'] = [
    {
      key: isAdmin ? RoleType.Manager : RoleType.MySelf,
      label: isAdmin
        ? 'Mối quan hệ của giám đốc'
        : formatMessage({ id: 'title.tab.relationship.my' }),
      children: <TableRelationship />,
    },
    {
      key: RoleType.Employee,
      label: formatMessage({ id: 'title.tab.relationship.employee' }),
      children: <TableRelationship />,
    },
  ];

  const onChange = (key: string) => {
    navigate(`?tab=${key}&tenant=${tenant}`);
  };

  useEffect(() => {
    if (!activeKey) {
      navigate(`?tab=${isAdmin ? RoleType.Manager : RoleType.MySelf}&tenant=${tenant}`);
    }
  }, [activeKey]);

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
    <ModalRelationshipProvider>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.relationship' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.relationship' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>
          {totalRecords} {formatMessage({ id: 'title.document.relationship' })}
        </span>
      </div>
      {(isAdmin || isSaleDirector) && (
        <Tabs activeKey={activeKey} items={items} onChange={onChange} />
      )}
      {!(isAdmin || isSaleDirector) && <TableRelationship />}
    </ModalRelationshipProvider>
  );
}

const subTitleStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1.4rem;
`;
const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2.3rem;
  font-weight: 600;
`;
