/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';

import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSupplier } from '@/modules/category/services/supplier.service';
type DeleteSupplierProps = {
  closeModal: () => void;
  data?: DataSupplierType;
  supplierIds: string[];
};
export const DeleteSupplier = ({ closeModal, supplierIds }: DeleteSupplierProps) => {
  const { deleteSupplier, getAllSupplier } = useSupplier();
  const pageIndex = useRootSelector((state) => state.category.supplier.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-supplier', false]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');
  const handleDeleteSupplier = async () => {
    const deleteclient = await deleteSupplier(supplierIds);
    if (deleteclient) {
      getAllSupplier({
        pageIndex: pageIndex || 1,
        pageSize: Pagination.PAGESIZE,
        roleType: tab!,
      });

      closeModal();
    } else {
      console.error('Failed to delete supplier');
    }
  };
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các mục tiêu đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteSupplier}>
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
