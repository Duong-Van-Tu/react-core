/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { TableCustom } from '@/components/table';
import { myKPIColumns } from './columns/my-kpi.column';
import { DataKPIType } from './type.kpi';
import { Search } from '@/components/search';
import { Button, Checkbox, Col, Row } from 'antd';
import { useModalKPI } from '../../components/modals/kpi';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CustomIcon } from '@/components/icons';

const myData: DataKPIType[] = [
  {
    key: 1,
    proposer: 'proposer1',
    criteria: 'criteria1',
    objective: 'objective1',
    reality: 'reality1',
    targetPoint: 'targetPoint1',
    implementationTime: 'implementationTime1',
    calculationMethod: 'calculationMethod1',
  },
  {
    key: 2,
    proposer: 'proposer2',
    criteria: 'criteria2',
    objective: 'objective2',
    reality: 'reality2',
    targetPoint: 'targetPoint2',
    implementationTime: 'implementationTime2',
    calculationMethod: 'calculationMethod2',
  },
  {
    key: 3,
    proposer: 'proposer3',
    criteria: 'criteria3',
    objective: 'objective3',
    reality: 'reality3',
    targetPoint: 'targetPoint3',
    implementationTime: 'implementationTime3',
    calculationMethod: 'calculationMethod3',
  },
  {
    key: 4,
    proposer: 'proposer4',
    criteria: 'criteria4',
    objective: 'objective4',
    reality: 'reality4',
    targetPoint: 'targetPoint4',
    implementationTime: 'implementationTime4',
    calculationMethod: 'calculationMethod4',
  },
  {
    key: 5,
    proposer: 'proposer5',
    criteria: 'criteria5',
    objective: 'objective5',
    reality: 'reality5',
    targetPoint: 'targetPoint5',
    implementationTime: 'implementationTime5',
    calculationMethod: 'calculationMethod5',
  },
  {
    key: 6,
    proposer: 'proposer6',
    criteria: 'criteria6',
    objective: 'objective6',
    reality: 'reality6',
    targetPoint: 'targetPoint6',
    implementationTime: 'implementationTime6',
    calculationMethod: 'calculationMethod6',
  },
  {
    key: 7,
    proposer: 'proposer7',
    criteria: 'criteria7',
    objective: 'objective7',
    reality: 'reality7',
    targetPoint: 'targetPoint7',
    implementationTime: 'implementationTime7',
    calculationMethod: 'calculationMethod7',
  },
  {
    key: 8,
    proposer: 'proposer8',
    criteria: 'criteria8',
    objective: 'objective8',
    reality: 'reality8',
    targetPoint: 'targetPoint8',
    implementationTime: 'implementationTime8',
    calculationMethod: 'calculationMethod8',
  },
  {
    key: 9,
    proposer: 'proposer9',
    criteria: 'criteria9',
    objective: 'objective9',
    reality: 'reality9',
    targetPoint: 'targetPoint9',
    implementationTime: 'implementationTime9',
    calculationMethod: 'calculationMethod9',
  },
  {
    key: 10,
    proposer: 'proposer10',
    criteria: 'criteria10',
    objective: 'objective10',
    reality: 'reality10',
    targetPoint: 'targetPoint10',
    implementationTime: 'implementationTime10',
    calculationMethod: 'calculationMethod10',
  },
  {
    key: 11,
    proposer: 'proposer11',
    criteria: 'criteria11',
    objective: 'objective11',
    reality: 'reality11',
    targetPoint: 'targetPoint11',
    implementationTime: 'implementationTime11',
    calculationMethod: 'calculationMethod11',
  },
  {
    key: 12,
    proposer: 'proposer12',
    criteria: 'criteria12',
    objective: 'objective12',
    reality: 'reality12',
    targetPoint: 'targetPoint12',
    implementationTime: 'implementationTime12',
    calculationMethod: 'calculationMethod12',
  },
  {
    key: 13,
    proposer: 'proposer13',
    criteria: 'criteria13',
    objective: 'objective13',
    reality: 'reality13',
    targetPoint: 'targetPoint13',
    implementationTime: 'implementationTime13',
    calculationMethod: 'calculationMethod13',
  },
  {
    key: 14,
    proposer: 'proposer14',
    criteria: 'criteria14',
    objective: 'objective14',
    reality: 'reality14',
    targetPoint: 'targetPoint14',
    implementationTime: 'implementationTime14',
    calculationMethod: 'calculationMethod14',
  },
  {
    key: 15,
    proposer: 'proposer15',
    criteria: 'criteria15',
    objective: 'objective15',
    reality: 'reality15',
    targetPoint: 'targetPoint15',
    implementationTime: 'implementationTime15',
    calculationMethod: 'calculationMethod15',
  },
  {
    key: 16,
    proposer: 'proposer16',
    criteria: 'criteria16',
    objective: 'objective16',
    reality: 'reality16',
    targetPoint: 'targetPoint16',
    implementationTime: 'implementationTime16',
    calculationMethod: 'calculationMethod16',
  },
  {
    key: 17,
    proposer: 'proposer17',
    criteria: 'criteria17',
    objective: 'objective17',
    reality: 'reality17',
    targetPoint: 'targetPoint17',
    implementationTime: 'implementationTime17',
    calculationMethod: 'calculationMethod17',
  },
  {
    key: 18,
    proposer: 'proposer18',
    criteria: 'criteria18',
    objective: 'objective18',
    reality: 'reality18',
    targetPoint: 'targetPoint18',
    implementationTime: 'implementationTime18',
    calculationMethod: 'calculationMethod18',
  },
  {
    key: 19,
    proposer: 'proposer19',
    criteria: 'criteria19',
    objective: 'objective19',
    reality: 'reality19',
    targetPoint: 'targetPoint19',
    implementationTime: 'implementationTime19',
    calculationMethod: 'calculationMethod19',
  },
  {
    key: 20,
    proposer: 'proposer20',
    criteria: 'criteria20',
    objective: 'objective20',
    reality: 'reality20',
    targetPoint: 'targetPoint20',
    implementationTime: 'implementationTime20',
    calculationMethod: 'calculationMethod20',
  },
];

export default function MyKPI() {
  const { openModal } = useModalKPI();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onSelectChange(myData.map((item) => item.key));
    } else {
      onSelectChange([]);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

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
        dataSource={myData}
        loading={false}
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
