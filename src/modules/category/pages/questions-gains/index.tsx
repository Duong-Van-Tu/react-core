/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
import { ModalQuestionGainsProvider } from '../../components/modals/question-gains';
import TableQuestionGains from './table-questionGain';
export default function QuestionrPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Danh mục',
          en_US: 'Category',
        },
      },
      {
        title: {
          vi_VN: 'Câu hỏi bằng GAINS',
          en_US: 'Questions using GAINS',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return (
    <ModalQuestionGainsProvider>
      <h3 css={titleStyle}>Câu hỏi bảng GAIN</h3>
      <TableQuestionGains />
    </ModalQuestionGainsProvider>
  );
}
const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin-bottom: 0.5rem;
`;
