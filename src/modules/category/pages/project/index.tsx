/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
import { ModalProjectProvider } from '../../components/modals/project';
import { CustomIcon } from '@/components/icons';
import TableProject from './table-project';
import { useLocale } from '@/hooks/locale.hook';
export default function ProjectPage() {
  const { formatMessage } = useLocale();
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
          vi_VN: 'Dự án',
          en_US: 'Project',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return (
    <ModalProjectProvider>
      <h3 css={titleStyle}>Dự án</h3>
      <div css={subTitleStyle}>
        <CustomIcon width={8} height={8} type="dot" />
        <span>
          <span css={subTitleStyle}>{formatMessage({ id: 'title.document.project' })}</span>
        </span>
      </div>
      <TableProject />
    </ModalProjectProvider>
  );
}

const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin-bottom: 0.5rem;
`;
const subTitleStyle = css`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.8rem;
  color: rgba(84, 104, 129, 1);
`;
