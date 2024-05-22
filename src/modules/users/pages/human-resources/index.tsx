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
import { Search, SearchParams } from '@/components/search';

export default function HumanResourcesPage() {
  const { formatMessage } = useLocale();
  const { getListUsers } = useHumanResources();
  const [loadingAdmin] = useWatchLoading(['get-list-user', true]);

  const { data, pagination } = useRootSelector((state) => state.user.humanResources);
  const user = useRootSelector((state) => state.auth.user);

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
    }
  };

  const handleSearch = ({ textSearch, time }: SearchParams) => {
    getListUsers({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      time,
    });
  };

  return (
    <div>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.inforPersonnel' })}</h3>
      {isAdmin && (
        <div css={searchContainer}>
          <Search onSearch={handleSearch} />
        </div>
      )}
      <TableCustom
        columns={usersColumns}
        dataSource={isAdmin ? data : [user]}
        loading={isAdmin && loadingAdmin}
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
  margin: 2.6rem 0;
`;
