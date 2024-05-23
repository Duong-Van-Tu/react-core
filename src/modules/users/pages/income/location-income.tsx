import { TableCustom } from '@/components/table';
import {
  locationIncomeColumnsAdmin,
  locationIncomeColumnsUser,
} from './column/location-income.column';
import { FilterIncomeType } from '../../services/income.service';
import { Pagination } from '@/constants/pagination';

type Props = {
  data: DataIncomTypeWithRoleAdminType[] | DataIncomTypeWithRoleUserType[] | undefined;
  loading: boolean;
  isAdmin: boolean | undefined;
  pagination: PaginationAPI | undefined;
  getListIncomeWithRoleAdmin: (params: FilterIncomeType) => void;
  getListIncomeWithRoleUser: (params: FilterIncomeType) => void;
};

export default function LocationIncomeTable({
  data,
  isAdmin,
  loading,
  pagination,
  getListIncomeWithRoleAdmin,
  getListIncomeWithRoleUser,
}: Props) {
  return (
    <TableCustom
      columns={isAdmin ? locationIncomeColumnsAdmin : locationIncomeColumnsUser}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.key}
      pagination={{
        current: pagination?.pageIndex,
        pageSize: Pagination.PAGESIZE,
        total: pagination?.totalRecords,
        position: ['bottomCenter'],
        onChange: (page) => {
          if (isAdmin) {
            getListIncomeWithRoleAdmin({
              pageIndex: page,
              pageSize: Pagination.PAGESIZE,
            });
          } else {
            getListIncomeWithRoleUser({
              pageIndex: page,
              pageSize: Pagination.PAGESIZE,
            });
          }
        },
      }}
      scroll={{ x: 1450 }}
    />
  );
}
