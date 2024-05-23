import { TableCustom } from '@/components/table';
import { currentIncomeColumns, adminCurrentIncomeColumns } from './column/current-income.column';
import { Pagination } from '@/constants/pagination';
import { FilterIncomeType } from '../../services/income.service';

type Props = {
  data: DataIncomeType[];
  loading: boolean;
  isAdmin: boolean | undefined;
  pagination: PaginationAPI | undefined;
  getListIncome: (params: FilterIncomeType) => void;
};

export default function CurrentIncomeTable({
  data,
  loading,
  isAdmin,
  pagination,
  getListIncome,
}: Props) {
  return (
    <TableCustom
      columns={isAdmin ? adminCurrentIncomeColumns : currentIncomeColumns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.key}
      pagination={
        isAdmin
          ? {
              current: pagination?.pageIndex,
              pageSize: Pagination.PAGESIZE,
              total: pagination?.totalRecords,
              position: ['bottomCenter'],
              onChange: (page) => {
                getListIncome({
                  pageIndex: page,
                  pageSize: Pagination.PAGESIZE,
                });
              },
            }
          : undefined
      }
      scroll={{ x: 1450 }}
    />
  );
}
