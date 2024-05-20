/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, TabsProps } from 'antd';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { ModalInforIncomeProvider } from '../../components/inforIncome';
import LocationIncomeTable from './location-income';
import CurrentIncomeTable from './current-income';
export default function InformationIncomePage() {
  const dispatch = useDispatch();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Thu nhập trong năm',
      children: <CurrentIncomeTable />,
    },
    {
      key: '2',
      label: 'Thu nhập theo vị trí',
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
          en_US: 'Personsel',
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
    <ModalInforIncomeProvider>
      <div>
        <h3 css={titleStyle}>Thông tin thu nhập</h3>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </ModalInforIncomeProvider>
  );
}

const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.3rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: #101828;
`;
