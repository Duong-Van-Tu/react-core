/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useWatchLoading } from '@/hooks/loading.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { Pagination } from '@/constants/pagination';
import { css } from '@emotion/react';
import { Button, Row, Space } from 'antd';
import { useQuestionGain } from '@/modules/category/services/question-gain.service';
type DeleteQuestionGainProps = {
  closeModal: () => void;
  data?: DataQuestionGainsType;
  questionIds: string[];
};
export const DeleteQuestionGain = ({ closeModal, questionIds, data }: DeleteQuestionGainProps) => {
  const { deleteQuestionGain, getAllQuestionGain } = useQuestionGain();
  const pageIndex =
    useRootSelector((state) => state.category.questionGain.pagination?.pageIndex) ?? 0;
  const [loading] = useWatchLoading(['delete-questionGain', false]);
  const dataQuestionGain = useRootSelector((state) => state.category.questionGain.data);
  const handledeleteQuestionGain = async () => {
    const deleteclient = await deleteQuestionGain(!!data ? [data.id!] : questionIds);
    if (deleteclient) {
      closeModal();
    } else {
      console.error('Failed to delete question Gain');
    }
  };
  useEffect(() => {
    if (dataQuestionGain.length === 0) {
      getAllQuestionGain({
        pageIndex: pageIndex === 1 ? 1 : pageIndex - 1,
        pageSize: Pagination.PAGESIZE,
      });
    }
  }, [dataQuestionGain]);
  return (
    <div css={rootStyle}>
      <h3 css={titleStyle}>Đồng ý xoá các câu hỏi đã chọn?</h3>
      <Row justify="center">
        <Space>
          <Button onClick={() => closeModal()}>Huỷ</Button>
          <Button loading={loading} type="primary" danger onClick={handledeleteQuestionGain}>
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
