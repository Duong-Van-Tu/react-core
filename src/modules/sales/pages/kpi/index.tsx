/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { Tabs, TabsProps } from 'antd';
import TableKPI from './table-kpi';
import { ModalProvider } from '../../components/modals/kpi';
import { usePermission } from '@/hooks/permission.hook';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@/hooks/query.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { getTenant } from '@/utils/common';
import { RoleType } from '@/enum/role.enum';

export default function KPIPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const { isSale, isAdmin, isSaleDirector } = usePermission();
  const tenant = getTenant();
  const totalRecords = useRootSelector((state) => state.sale.kpi.pagination?.totalRecords);
  const { tab: activeKey } = useQuery();

  const items: TabsProps['items'] = [
    {
      key: isAdmin ? RoleType.Manager : RoleType.MySelf,
      label: isAdmin ? 'Mục tiêu của giám đốc' : formatMessage({ id: 'title.tab.kpi.my' }),
      children: <TableKPI />,
    },
    {
      key: RoleType.Employee,
      label: formatMessage({ id: 'title.tab.kpi.employee' }),
      children: <TableKPI />,
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
          vi_VN: 'KPI',
          en_US: 'KPI',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return (
    <ModalProvider>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.kpi' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.kpi' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>
          {totalRecords} {formatMessage({ id: 'title.document.kpi' })}
        </span>
      </div>
      {(isAdmin || isSaleDirector) && (
        <Tabs activeKey={activeKey} items={items} onChange={onChange} />
      )}
      {isSale && <TableKPI />}
    </ModalProvider>
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
