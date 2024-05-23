/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { StatusBenefit } from '@/modules/sales/enum/status.enum';
import { useBenefit } from '@/modules/sales/services/benefit.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';

type FinalizePrivilegesProps = {
  closeModal: () => void;
  data: DataBenefitType;
};
export const FinalizePrivileges = ({ closeModal, data }: FinalizePrivilegesProps) => {
  const { updateStatusById } = useBenefit();
  const [loading] = useWatchLoading(['edit-statusBenefit', false]);

  const handleFinalizePrivileges = async () => {
    const editStatus = await updateStatusById({
      id: data.id,
      applicationUserId: data.applicationUser?.id,
      status: StatusBenefit.Confirm,
    } as DataBenefitType);

    if (editStatus) {
      closeModal();
    }
  };

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý chốt quyền lợi này</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" onClick={handleFinalizePrivileges}>
            Xác nhận
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
