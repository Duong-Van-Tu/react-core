/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Table } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { css } from '@emotion/react';
import { CustomIcon } from './icons';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

type ColumnsType<T> = TableProps<T>['columns'];

type TableCustomProps = {
  columns: ColumnsType<any>;
  data: any[];
  loading: boolean;
};

type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
};

const antIcon = <CustomIcon type="loading" color="#3498db" />;
export function TableCustom(props: TableCustomProps) {
  const { columns, data, loading } = props;

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 14,
    },
  });

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    }
  };

  return (
    <Table
      css={tableStyle}
      columns={columns}
      rowKey={(record) => record.key}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={{ indicator: antIcon, spinning: loading }}
      onChange={handleTableChange}
      scroll={{ x: 1400, y: 600 }}
    />
  );
}

const tableStyle = css`
  background: #fff;
  .ant-spin-spinning {
    svg {
      width: 4rem;
      height: 4rem;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
