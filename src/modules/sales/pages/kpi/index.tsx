/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';
import { Tabs, TabsProps } from 'antd';
import MyKPI from './my-kpi';
import EmployeeKPI from './employee-kpi';
import { ModalProvider } from '../../components/modals/kpi';

export default function KPIPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'title.tab.kpi.my' }),
      children: <MyKPI />,
    },
    {
      key: '2',
      label: formatMessage({ id: 'title.tab.kpi.employee' }),
      children: <EmployeeKPI />,
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
    <ModalProvider>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.kpi' })}</h3>
      <div css={subTitleStyle}>
        <span>{formatMessage({ id: 'title.document.kpi' })}</span>
        <CustomIcon width={8} height={8} type="dot" />
        <span>10 {formatMessage({ id: 'title.document.kpi' })}</span>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </ModalProvider>
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
