/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TableCustom } from '@/components/table';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { usersColumns } from './column';
// import { useHumanResources } from '../../services/human.resources.service';
import { Pagination } from '@/constants/pagination';
import { useRootSelector } from '@/hooks/selector.hook';
import { useWatchLoading } from '@/hooks/loading.hook';
import { usePermission } from '@/hooks/permission.hook';
import { useLocale } from '@/hooks/locale.hook';
import { Key } from 'antd/es/table/interface';
import { useHumanResources } from '../../services/human-resources.service';
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
          vi_VN: 'Danh mục',
          en_US: 'Category',
        },
      },
      {
        title: {
          vi_VN: 'Nhân sự',
          en_US: 'Personnel',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  const rowSelection = {
    onChange: (_selectedRowKeys: Key[], selectedRows: DataKPIType[]) => {
      console.log(selectedRows);
    },
  };

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

  const handleTableChange = (page: number) => {
    getListUsers({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
    });
  };

  return (
    <div>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.human-resource' })}</h3>
      {isAdmin && (
        <div css={searchContainer}>
          <Search onSearch={handleSearch} />
        </div>
      )}
      <TableCustom
        rowSelection={rowSelection}
        columns={usersColumns}
        dataSource={isAdmin ? data : [user]}
        loading={loadingAdmin}
        rowKey={(record) => record.id}
        onTableChange={(page) => handleTableChange(page)}
        pagination={
          isAdmin
            ? {
                current: pagination?.pageIndex,
                pageSize: Pagination.PAGESIZE,
                total: pagination?.totalRecords,
                position: ['bottomCenter'],
              }
            : undefined
        }
        scroll={{ x: 1450 }}
      />
    </div>
  );
}

const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2rem;
  font-weight: 500;
  margin-bottom: 2.4rem;
  color: #101828;
`;

const searchContainer = css`
  margin: 2.6rem 0;
`;
