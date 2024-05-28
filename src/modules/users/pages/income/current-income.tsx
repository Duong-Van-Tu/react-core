import { TableCustom } from '@/components/table';
import { currentIncomeColumns, adminCurrentIncomeColumns } from './column/current-income.column';
import { Pagination } from '@/constants/pagination';
import { FilterIncomeType } from '../../services/income.service';

type Props = {
  data: DataIncomeType[];
  loading: boolean;
  isAdministrator: boolean | undefined;
  pagination: PaginationAPI | undefined;
  getListIncome: (params: FilterIncomeType) => void;
};

export default function CurrentIncomeTable({
  data,
  loading,
  isAdministrator,
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
      columns={isAdministrator ? adminCurrentIncomeColumns : currentIncomeColumns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.key}
      onTableChange={(page) => handleTableChange(page)}
      pagination={
        isAdministrator
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
