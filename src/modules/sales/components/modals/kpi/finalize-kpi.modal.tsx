/** @jsxImportSource @emotion/react */
import { useWatchLoading } from '@/hooks/loading.hook';
import { usePermission } from '@/hooks/permission.hook';
import { Status } from '@/modules/sales/enum/status.enum';
import { useKPI } from '@/modules/sales/services/kpi.service';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';

type FinalizeKPIProps = {
  closeModal: () => void;
  data: DataKPIType;
};
export const FinalizeKPI = ({ closeModal, data }: FinalizeKPIProps) => {
  const { updateStatusKPI } = useKPI();
  const [loading] = useWatchLoading(['edit-status', false]);
  const { isSale, isSaleDirector } = usePermission();

  const handleFinalizeKPI = async () => {
    const editStatus = await updateStatusKPI({
      id: data.id,
      applicationUserId: data.userSuggest?.id,
      status: Status.Processing,
    } as DataKPIType);

    if (editStatus) {
      closeModal();
    }
  };

  const disableBtn = isSale
    ? data.goalStatus?.code !== Status.Updated
    : isSaleDirector && data.goalStatus?.code !== Status.Pending;

  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý chốt mục tiêu này</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button
            disabled={disableBtn}
            loading={loading}
            type="primary"
            onClick={handleFinalizeKPI}
          >
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
