/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useContract } from '@/modules/category/services/contract.service';
type DeleteContractProps = {
  closeModal: () => void;
  data?: DataContractType;
  contractIds: string[];
};
export const DeleteContract = ({ closeModal, contractIds, data }: DeleteContractProps) => {
  const { deleteContract, getAllContract } = useContract();
  const pageIndex = useRootSelector((state) => state.category.contract.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-contract', false]);
  const dataContract = useRootSelector((state) => state.category.contract.data);
  const handleDeleteContract = async () => {
    const deleteclient = await deleteContract(!!data ? [data.id!] : contractIds);
    if (deleteclient) {
      closeModal();
    } else {
      console.error('Failed to delete contract');
    }
  };

  useEffect(() => {
    if (dataContract.length === 0) {
      getAllContract({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
      });
    }
  }, [dataContract]);

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các hợp đồng đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeleteContract}>
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
