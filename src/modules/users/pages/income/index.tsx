/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Tabs, TabsProps } from 'antd';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import LocationIncomeTable from './location-income';
import CurrentIncomeTable from './current-income';
import { useLocale } from '@/hooks/locale.hook';
import { useIncome } from '../../services/income.service';
import { Pagination } from '@/constants/pagination';
import { useRootSelector } from '@/hooks/selector.hook';
import { usePermission } from '@/hooks/permission.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { Search, SearchParams } from '@/components/search';
import { DownloadOutlined } from '@ant-design/icons';

export default function InformationIncomePage() {
  const { getListIncome, getListIncomeWithRoleUser, getListIncomeWithRoleAdmin } = useIncome();
  const { isAdmin } = usePermission();
  const { formatMessage } = useLocale();

  const [loadingAdmin, loadingInComeWithRoleAdmin, loadingInComeWithRoleUser] = useWatchLoading(
    ['get-list-income', true],
    ['get-list-income-with-role-admin', true],
    ['get-list-income-with-role-user', true],
  );

  const dispatch = useDispatch();

  const { data, dataRoleAdmin, dataRoleUser, pagination } = useRootSelector(
    (state) => state.user.income,
  );

  const [tab, setTab] = useState('1');

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

  useEffect(() => {
    if (tab === '1') {
      getListIncome({
        pageIndex: Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
      });
      return;
    }
    if (tab === '2') {
      if (isAdmin) {
        getListIncomeWithRoleAdmin({
          pageIndex: Pagination.PAGEINDEX,
          pageSize: Pagination.PAGESIZE,
        });
      } else {
        getListIncomeWithRoleUser({
          pageIndex: Pagination.PAGEINDEX,
          pageSize: Pagination.PAGESIZE,
        });
      }
      return;
    }
  }, [tab]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'title.document.incomeDuringTheYear' }),
      children: (
        <CurrentIncomeTable
          data={data}
          loading={loadingAdmin}
          isAdmin={isAdmin}
          pagination={pagination}
          getListIncome={getListIncome}
        />
      ),
    },
    {
      key: '2',
      label: formatMessage({ id: 'title.document.incomeByPosition' }),
      children: (
        <LocationIncomeTable
          data={isAdmin ? dataRoleAdmin : dataRoleUser}
          isAdmin={isAdmin}
          loading={isAdmin ? loadingInComeWithRoleAdmin : loadingInComeWithRoleUser}
          pagination={pagination}
          getListIncomeWithRoleAdmin={getListIncomeWithRoleAdmin}
          getListIncomeWithRoleUser={getListIncomeWithRoleUser}
        />
      ),
    },
  ];

  const handleSearch = ({ textSearch, time }: SearchParams) => {
    if (tab === '1') {
      getListIncome({
        pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
        textSearch,
        time,
      });
      return;
    }
    if (tab === '2') {
      if (isAdmin) {
        getListIncomeWithRoleAdmin({
          pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
          pageSize: Pagination.PAGESIZE,
          textSearch,
          time,
        });
      } else {
        getListIncomeWithRoleUser({
          pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
          pageSize: Pagination.PAGESIZE,
          textSearch,
          time,
        });
      }
      return;
    }
  };

  const onChange = (key: string) => {
    setTab(key);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: ' center',
          justifyContent: 'space-between',
        }}
      >
        <h3 css={titleStyle}>{formatMessage({ id: 'title.document.inforIncome' })}</h3>
        {isAdmin && (
          <Button type="primary" size="large" icon={<DownloadOutlined />}>
            Import Excel
          </Button>
        )}
      </div>
      {isAdmin && (
        <div css={searchContainer}>
          <Search onSearch={handleSearch} />
        </div>
      )}
      <Tabs defaultActiveKey={tab} items={items} onChange={onChange} />
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

const searchContainer = css`
  margin: 2.6rem 0;
`;
