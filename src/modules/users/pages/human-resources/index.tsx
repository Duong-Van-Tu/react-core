/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TableCustom } from '@/components/table';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { usersColumns } from './column';
import { useHumanResources } from '../../services/human.resources.service';
import { Pagination } from '@/constants/pagination';
import { useRootSelector } from '@/hooks/selector.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { usePermission } from '@/hooks/permission.hook';
import { useLocale } from '@/hooks/locale.hook';
import { Search } from '@/components/search';

export default function HumanResourcesPage() {
  const { formatMessage } = useLocale();
  const { getListUsers, getUserProfile } = useHumanResources();
  const [loadingAdmin, loadingUser] = useWatchLoading(
    ['get-list-employee', true],
    ['get-user-profile', true],
  );

  const { item, data, pagination } = useRootSelector((state) => state.user.humanResources);
  const { isAdmin } = usePermission();
  const dispatch = useDispatch();

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
          vi_VN: 'Thông tin nhân sự',
          en_US: 'Personnel information',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  useEffect(() => {
    handleGetInfo();
  }, []);

  const handleGetInfo = () => {
    if (isAdmin) {
      getListUsers({
        pageIndex: Pagination.PAGEINDEX,
        pageSize: Pagination.PAGESIZE,
      });
    } else {
      getUserProfile();
    }
  };

  return (
    <div>
      <h3 css={titleStyle}>
        {formatMessage({ id: 'title.myRelationships.proposedReport.userInfo' })}
      </h3>
      <div css={searchContainer}>
        <Search onSearch={() => {}} />
      </div>
      <TableCustom
        columns={usersColumns}
        dataSource={isAdmin ? data : [item]}
        loading={isAdmin ? loadingAdmin : loadingUser}
        rowKey={(record) => record.id}
        pagination={
          isAdmin
            ? {
                current: pagination?.pageIndex,
                pageSize: Pagination.PAGESIZE,
                total: pagination?.totalRecords,
                position: ['bottomCenter'],
                onChange: (page) => {
                  getListUsers({
                    pageIndex: page,
                    pageSize: Pagination.PAGESIZE,
                  });
                },
              }
            : undefined
        }
        scroll={{ x: 1450 }}
      />
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
  margin-top: 2.6rem;
`;
