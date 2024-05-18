/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { TableCustom } from '@/components/table';
import { DataUpdateHistoryOpportunityType } from '@/modules/sales/pages/opportunity/type.opportunity';
import { updateHistoryOpportunityColumns } from '@/modules/sales/pages/opportunity/columns/update-history-opportunity.column';

const data: DataUpdateHistoryOpportunityType[] = [
  {
    key: 1,
    updateTime: '19/4/2024',
    updatePerson: 'Giám đốc bán hàng',
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
  },
  {
    key: 2,
    updateTime: '19/4/2024',
    updatePerson: 'Giám đốc bán hàng',
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
  },
  {
    key: 3,
    updateTime: '19/4/2024',
    updatePerson: 'Giám đốc bán hàng',
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
  },
  {
    key: 4,
    updateTime: '19/4/2024',
    updatePerson: 'Giám đốc bán hàng',
    target: 'Duy trì HĐ năm 2023 và tăng giá trị hợp đồng năm 2024',
  },
];
export const UpdateHistoryOpportunity = () => {
  const { formatMessage } = useLocale();
  return (
    <div css={containerStyle}>
      <div css={closeStyle}>
        <CustomIcon width={12} height={14} type="prev" />
        <Link css={goBackLinkStyle} to="/sales/opportunity/update-opportunity/">
          {formatMessage({ id: 'title.back' })}
        </Link>
      </div>
      <h1 css={titleStyle}>Lịch sử cập nhật</h1>
      <div css={tableCustomStyle}>
        <TableCustom
          columns={updateHistoryOpportunityColumns}
          dataSource={data}
          loading={false}
          rowKey={(record) => record.key}
          pagination={{ current: 1, pageSize: 3 }}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  max-width: 105rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 15px;
`;

const closeStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.4rem;
  margin-top: 3.7rem;
  svg path {
    fill: rgba(0, 0, 0, 1);
  }
`;

const titleStyle = css`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const goBackLinkStyle = css`
  font-size: 1.4rem;
  color: #000;
`;
const tableCustomStyle = css`
  padding: 0.32rem 0;
`;
