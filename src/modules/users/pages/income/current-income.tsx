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
  const handleTableChange = (page: number) => {
    getListIncome({
      pageIndex: page,
      pageSize: Pagination.PAGESIZE,
    });
  };

  return (
    <TableCustom
      columns={isAdmin ? adminCurrentIncomeColumns : currentIncomeColumns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.key}
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
  );
}
