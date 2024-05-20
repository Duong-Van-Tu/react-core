/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { Tabs, TabsProps } from 'antd';
import TablePrivileges from './table-privileges';
import { ModalPrivilegesProvider } from '../../components/modals/privileges';
import { useQuery } from '@/hooks/query.hook';
import { useNavigate } from 'react-router-dom';
import { getTenant } from '@/utils/common';
import { usePermission } from '@/hooks/permission.hook';
import { RoleType } from '@/enum/role.enum';

export default function PrivilegesPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const tenant = getTenant();
  const { isAdmin, isSaleDirector, isSale } = usePermission();
  const { tab: activeKey } = useQuery();

  const items: TabsProps['items'] = [
    {
      key: isAdmin ? RoleType.Manager : RoleType.MySelf,
      label: formatMessage({ id: 'title.tab.privileges.my' }),
      children: <TablePrivileges />,
    },
    {
      key: RoleType.Employee,
      label: formatMessage({ id: 'title.tab.privileges.employee' }),
      children: <TablePrivileges />,
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
          vi_VN: 'Cơ hội',
          en_US: 'Privileges',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return (
    <ModalPrivilegesProvider>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.privileges' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.privileges' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>10 {formatMessage({ id: 'title.document.privileges' })}</span>
      </div>
      {(isAdmin || isSaleDirector) && (
        <Tabs activeKey={activeKey} items={items} onChange={onChange} />
      )}
      {isSale && <TablePrivileges />}
    </ModalPrivilegesProvider>
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
