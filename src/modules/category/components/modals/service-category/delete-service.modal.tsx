/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';

import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { useService } from '@/modules/category/services/service-category.service';
type DeleteServiceProps = {
  closeModal: () => void;
  data?: DataServiceCategoryType;
  serviceIds: string[];
};
export const DeleteService = ({ closeModal, serviceIds, data }: DeleteServiceProps) => {
  const { deleteService, getAllService } = useService();
  const pageIndex = useRootSelector((state) => state.category.sevice.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-service', false]);
  const dataServiceCategory = useRootSelector((state) => state.category.sevice.data);
  const handleDeleteService = async () => {
    const deleteclient = await deleteService(!!data ? [data.id!] : serviceIds);
    if (deleteclient) {
      closeModal();
    } else {
      console.error('Failed to delete service');
    }
  };
  useEffect(() => {
    if (dataServiceCategory.length === 0) {
      getAllService({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
      });
    }
  }, [dataServiceCategory]);
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các mảng dịch vụ đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteService}>
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
