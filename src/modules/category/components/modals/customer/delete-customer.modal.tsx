/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { useCustomer } from '@/modules/category/services/customer.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { updateTotalRecordsCustomerAction } from '@/modules/category/reducers/slicers/customer.slice';
type DeleteCustomerProps = {
  closeModal: () => void;
  data?: DataCustomerType;
  customerIds: string[];
};
export const DeleteCustomer = ({ closeModal, customerIds, data }: DeleteCustomerProps) => {
  const { deleteCustomer, getAllCustomer } = useCustomer();
  const dispatch = useDispatch();
  const pageIndex = useRootSelector((state) => state.category.customer.pagination?.pageIndex) ?? 0;
  const totalRecords = useRootSelector((state) => state.category.customer.pagination?.totalRecords);
  const [loading] = useWatchLoading(['delete-customer', false]);
  const dataCustomer = useRootSelector((state) => state.category.customer.data);
  const handleDeleteCustomer = async () => {
    const deleteclient = await deleteCustomer(!!data ? [data.id!] : customerIds);
    if (deleteclient) {
      const newTotalRecords = totalRecords - customerIds.length;
      dispatch(updateTotalRecordsCustomerAction(newTotalRecords));
      closeModal();
    } else {
      console.error('Failed to delete customer');
    }
  };
  useEffect(() => {
    if (dataCustomer.length === 0) {
      getAllCustomer({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
      });
    }
  }, [dataCustomer]);

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các khách hàng đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteCustomer}>
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
