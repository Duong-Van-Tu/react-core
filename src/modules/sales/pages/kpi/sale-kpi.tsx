/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Fragment, useEffect } from 'react';
import { TableCustom } from '@/components/table';
import columns from './columns/sale.column';
import { Search, SearchParams } from '@/components/search';
import { Col, Row } from 'antd';
import { useKPI } from '../../services/kpi.service';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';

export default function SaleKPI() {
  const { getAllKPI, getAllStatusKPI } = useKPI();
  const [loading] = useWatchLoading(['get-kpi', true]);
  const { data, pagination, status } = useRootSelector((state) => state.sale.kpi);

  const handleSearch = ({ textSearch, statusId, time }: SearchParams) => {
    getAllKPI({
      pageIndex: pagination?.pageIndex ?? Pagination.PAGEINDEX,
      pageSize: Pagination.PAGESIZE,
      textSearch,
      statusId,
      time,
    });
  };

  useEffect(() => {
    getAllKPI({ pageIndex: Pagination.PAGEINDEX, pageSize: Pagination.PAGESIZE });
    getAllStatusKPI();
  }, [getAllKPI, getAllStatusKPI]);

  return (
    <Fragment>
      <div css={searchStyle}></div>
      <Search onSearch={handleSearch} status={status} />
      <Row css={rowHeaderStyle} justify="end">
        <Col>Tổng điểm đạt được: 200</Col>
      </Row>
      <TableCustom
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={{
          current: pagination?.pageIndex,
          pageSize: Pagination.PAGESIZE,
          total: pagination?.totalRecords,
          position: ['bottomCenter'],
          onChange: (page) => {
            getAllKPI({ pageIndex: page, pageSize: Pagination.PAGESIZE });
          },
        }}
        scroll={{ x: 1450 }}
      />
    </Fragment>
  );
}

const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;

const searchStyle = css`
  margin-top: 3rem;
`;
