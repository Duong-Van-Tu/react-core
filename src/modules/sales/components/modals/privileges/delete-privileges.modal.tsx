/** @jsxImportSource @emotion/react */
import { Pagination } from '@/constants/pagination';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { useBenefit } from '@/modules/sales/services/benefit.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type DeletePrivilegesProps = {
  closeModal: () => void;
  benefitIds: string[];
  data?: DataBenefitType;
};
export const DeletePrivileges = ({ closeModal, benefitIds, data }: DeletePrivilegesProps) => {
  const { deleteBenefit, getAllBenefit } = useBenefit();
  const pageIndex = useRootSelector((state) => state.sale.kpi.pagination?.pageIndex);
  const [loading] = useWatchLoading(['delete-benefit', false]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get('tab');
  const dataBenefit = useRootSelector((state) => state.sale.benefit.data);

  const handleDeletePrivileges = async () => {
    const deleteGoal = await deleteBenefit(!!data ? [data.id!] : benefitIds);
    if (deleteGoal) {
      closeModal();
    }
  };

  useEffect(() => {
    if (dataBenefit.length === 0) {
      getAllBenefit({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
        roleType: tab!,
      });
    }
  }, [dataBenefit]);

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá quyền lợi đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handleDeletePrivileges}>
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
