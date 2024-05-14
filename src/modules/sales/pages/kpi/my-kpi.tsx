/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { TableCustom } from '@/components/table';
import { myKPIColumns } from './columns/my-kpi.column';
import { Search } from '@/components/search';
import { Button, Checkbox, Col, Row } from 'antd';
import { useModalKPI } from '../../components/modals/kpi';
import { useEffect, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CustomIcon } from '@/components/icons';
import { useKPI } from '../../services/kpi.service';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';

export default function MyKPI() {
  const { openModal } = useModalKPI();
  const { getAllKPI } = useKPI();
  const [loading] = useWatchLoading(['get-kpi', true]);
  const data = useRootSelector((state) => state.sale.kpi.data);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onSelectChange(data.map((item) => item.key));
    } else {
      onSelectChange([]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    getAllKPI();
  }, [getAllKPI]);
  return (
    <div css={rootStyle}>
      <Button
        onClick={() => openModal('Add KPI')}
        type="primary"
        css={addKPIBtnStyle}
        iconPosition="start"
      >
        <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />{' '}
        <span>Thêm mục tiêu</span>
      </Button>
      <Search />
      <Row css={rowHeaderStyle} justify="space-between">
        <Col>
          <Checkbox onChange={handleSelectAllChange}>Chọn tất cả</Checkbox>
        </Col>
        <Col>Tổng điểm đạt được: 200</Col>
      </Row>
      <TableCustom
        rowSelection={rowSelection}
        columns={myKPIColumns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.key}
        pagination={{ current: 1, pageSize: 7 }}
        scroll={{ x: 1450 }}
      />
    </div>
  );
}

const rootStyle = css`
  position: relative;
`;

const addKPIBtnStyle = css`
  position: absolute;
  right: 0;
  top: -6rem;
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const rowHeaderStyle = css`
  margin: 2.4rem 0 1.4rem 0;
`;
