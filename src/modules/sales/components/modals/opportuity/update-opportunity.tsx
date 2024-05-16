/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useModalOpportunity } from '../../modals/opportuity';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { DataUpdateOpportunityType } from '@/modules/sales/pages/opportunity/type.opportunity';
import { updateOpportunityColumns } from '@/modules/sales/pages/opportunity/columns/updateopportunity.column';
import { AddUpdateOpportuity } from './add-update-opportuity';
import { useState } from 'react';

const data: DataUpdateOpportunityType[] = [
  {
    key: 1,
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    activites: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    time: '19/4/2024',
    result: 'Tốt',
  },
  {
    key: 2,
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    activites: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    time: '19/4/2024',
    result: 'Tốt',
  },
  {
    key: 3,
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    activites: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    time: '19/4/2024',
    result: 'Tốt',
  },
  {
    key: 4,
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    activites: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    time: '19/4/2024',
    result: 'Tốt',
  },
  {
    key: 5,
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    activites: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    time: '19/4/2024',
    result: 'Tốt',
  },
  {
    key: 6,
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    activites: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    time: '19/4/2024',
    result: 'Tốt',
  },
  {
    key: 7,
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    activites: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    time: '19/4/2024',
    result: 'Tốt',
  },
  {
    key: 8,
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    activites: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
    time: '19/4/2024',
    result: 'Tốt',
  },
];
export const UpdateOpportunity = () => {
  const { formatMessage } = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div css={containerStyle}>
      <div css={closeStyle}>
        <CustomIcon color="rgba(0, 0, 0, 1)" width={20} height={20} type="close" />
        <Link to="/sales/opportunity" css={closeLinkStyle}>
          {formatMessage({ id: 'title.exit' })}
        </Link>
      </div>
      <div css={subTitleStyle}>
        <div>
          <h3 css={titleStyle}>Cập nhật cơ hội</h3>
          <div css={historyUpdateStyle}>
            <span>Lần cập nhật gần nhất:</span>
            <span> 11:00 - 20/04/2024:</span>
            <CustomIcon color="rgba(84, 104, 129, 1)" width={10} height={10} type="dot" />{' '}
            <Link to="" css={titleViewHistoryStyle}>
              Xem lịch sử
            </Link>
          </div>
        </div>
        <div>
          <Button
            onClick={() => openModal()}
            type="primary"
            css={addKOpportunitytnStyle}
            iconPosition="start"
            size="middle"
          >
            <CustomIcon color="#fff" width={16} height={16} type="circle-plus" />{' '}
            <span>Thêm cập nhật</span>
          </Button>
          <Modal>
            <AddUpdateOpportuity closeModal={closeModal} />
          </Modal>
        </div>
      </div>
      <TableCustom
        columns={updateOpportunityColumns}
        dataSource={data}
        loading={false}
        rowKey={(record) => record.key}
        pagination={{ current: 1, pageSize: 8 }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  max-width: 144rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

const closeStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  margin-top: 3.7rem;
  svg path {
    fill: rgba(0, 0, 0, 1);
  }
`;

const closeLinkStyle = css`
  font-size: 1.4rem;
  color: rgba(16, 24, 40, 1);
  font-weight: 600;
`;

const titleStyle = css`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const subTitleStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3.2rem 0;
  font-size: 1.4rem;
`;

const addKOpportunitytnStyle = css`
  background: #0070b8;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  &:hover {
    background: #0070b8 !important;
    opacity: 0.9;
  }
`;

const historyUpdateStyle = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(84, 104, 129, 1);
  font-size: 1.2rem;
  font-weight: 700;
`;

const titleViewHistoryStyle = css`
  color: rgba(84, 104, 129, 1);
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: underline;
`;
