/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, TabsProps } from 'antd';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import LocationIncomeTable from './location-income';
import CurrentIncomeTable from './current-income';
import { useLocale } from '@/hooks/locale.hook';

export default function InformationIncomePage() {
  const { formatMessage } = useLocale();

  const dispatch = useDispatch();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'title.document.incomeDuringTheYear' }),
      children: <CurrentIncomeTable />,
    },
    {
      key: '2',
      label: formatMessage({ id: 'title.document.incomeByPosition' }),
      children: <LocationIncomeTable />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Nhân sự',
          en_US: 'Personnel',
        },
      },
      {
        title: {
          vi_VN: 'Thông tin thu nhập',
          en_US: 'Income information',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return (
    <div>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.inforIncome' })}</h3>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.3rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: #101828;
`;
