/** @jsxImportSource @emotion/react */
import { Pagination } from '@/constants/pagination';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useKPI } from '@/modules/sales/services/kpi.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type DeleteKPIProps = {
  closeModal: () => void;
  goalIds: string[];
  data?: DataKPIType;
};
export const DeleteKPI = ({ closeModal, goalIds, data }: DeleteKPIProps) => {
  const { deleteKPI, getAllKPI } = useKPI();
  const pageIndex = useRootSelector((state) => state.sale.kpi.pagination?.pageIndex);
  const dataKPI = useRootSelector((state) => state.sale.kpi.data);
  const [loading] = useWatchLoading(['delete-kpi', false]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');

  const handleDeleteKPI = async () => {
    const deleted = await deleteKPI(!!data ? [data.id!] : goalIds);
    if (deleted) {
      closeModal();
    }
  };

  useEffect(() => {
    if (dataKPI.length === 0) {
      getAllKPI({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
        roleType: tab!,
      });
    }
  }, [dataKPI]);
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các mục tiêu đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteKPI}>
            Xoá
          </Button>
        </Space>
      </Row>
    </div>
  );
};

const rootStyle = css`
  margin-top: 2rem;
  padding: 0 2rem;
`;

const titleStyle = css`
  font-size: 1.8rem;
  line-height: 2rem;
  text-align: center;
  margin-bottom: 2.4rem;
  font-weight: 500;
`;
