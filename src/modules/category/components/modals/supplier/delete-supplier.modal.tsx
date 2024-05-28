/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';

import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';

import { useSupplier } from '@/modules/category/services/supplier.service';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTotalRecordsSupplierAction } from '@/modules/category/reducers/slicers/supplier.slice';
type DeleteSupplierProps = {
  closeModal: () => void;
  data?: DataSupplierType;
  supplierIds: string[];
};
export const DeleteSupplier = ({ closeModal, supplierIds, data }: DeleteSupplierProps) => {
  const { deleteSupplier, getAllSupplier } = useSupplier();
  const dispatch = useDispatch();
  const pageIndex = useRootSelector((state) => state.category.supplier.pagination?.pageIndex) ?? 0;
  const totalRecords = useRootSelector((state) => state.category.supplier.pagination?.totalRecords);
  const [loading] = useWatchLoading(['delete-supplier', false]);
  const dataSupplier = useRootSelector((state) => state.category.supplier.data);
  const handleDeleteSupplier = async () => {
    const deleteclient = await deleteSupplier(!!data ? [data.id!] : supplierIds);
    if (deleteclient) {
      const newTotalRecords = totalRecords - supplierIds.length;
      dispatch(updateTotalRecordsSupplierAction(newTotalRecords));
      closeModal();
    } else {
      console.error('Failed to delete supplier');
    }
  };
  useEffect(() => {
    if (dataSupplier.length === 0) {
      getAllSupplier({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
      });
    }
  }, [dataSupplier]);
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các nhà cung cấp đã chọn?</h3>
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
