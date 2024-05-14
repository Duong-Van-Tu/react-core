/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Table, PaginationProps, Button } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { css } from '@emotion/react';
import { CustomIcon } from './icons';
import { useLocale } from '@/hooks/locale.hook';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

type TableCustom = TableProps & {
  onTableChange?: () => void;
};

type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
};

const antIcon = <CustomIcon type="loading" color="#3498db" />;
export function TableCustom(props: TableCustom) {
  const { onTableChange, loading, pagination } = props;
  const { formatMessage } = useLocale();
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <Button css={btnSwitchBtn}>
          <CustomIcon type="previous" width={14} height={12} />
          <span> {formatMessage({ id: 'table.pagination.button.prev' })}</span>
        </Button>
      );
    }
    if (type === 'next') {
      return (
        <Button css={btnSwitchBtn}>
          <span>{formatMessage({ id: 'table.pagination.button.next' })}</span>
          <CustomIcon type="next" width={14} height={12} />
        </Button>
      );
    }
    return originalElement;
  };

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      ...pagination,
      position: ['bottomCenter'],
      itemRender: itemRender,
    },
  });

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    onTableChange?.();
    setTableParams((prevParams) => ({
      pagination: {
        ...prevParams.pagination,
        ...pagination,
      },
      filters,
      ...sorter,
    }));

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    }
  };

  return (
    <Table
      {...props}
      css={tableStyle}
      pagination={tableParams.pagination}
      loading={{ indicator: antIcon, spinning: !!loading }}
      onChange={handleTableChange}
    />
  );
}

const btnSwitchBtn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  &:hover {
    svg {
      path {
        fill: #4096ff;
      }
    }
  }
`;

const tableStyle = css`
  background: #fff;
  border-radius: 0.4rem;
  box-shadow: 0.03px 0.1px 2px #cecccc;
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

  .ant-pagination {
    padding: 0 3rem;
    .ant-pagination-prev {
      margin-right: auto;
    }
    .ant-pagination-next {
      margin-left: auto;
    }
  }

  .ant-pagination-disabled {
    button {
      cursor: default;
      user-select: none;
      opacity: 0.8;
    }
    button:hover {
      svg {
        path {
          fill: unset;
        }
      }
    }
  }
`;
