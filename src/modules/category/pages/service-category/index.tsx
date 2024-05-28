/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
import { ModalServiceProvider } from '../../components/modals/service-category';
import { CustomIcon } from '@/components/icons';
import TableService from './table-service';
import { useRootSelector } from '@/hooks/selector.hook';
import { useLocale } from '@/hooks/locale.hook';
export default function ServicePage() {
  const totalRecords = useRootSelector((state) => state.category.sevice.pagination?.totalRecords);
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
          vi_VN: 'Mảng dịch vụ',
          en_US: 'Service category',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return (
    <ModalServiceProvider>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.service' })}</h3>
      <div css={subTitleStyle}>
        <CustomIcon width={8} height={8} type="dot" />
        <span>
          <span css={subTitleStyle}>
            {totalRecords} {formatMessage({ id: 'title.document.service' })}
          </span>
        </span>
      </div>
      <TableService />
    </ModalServiceProvider>
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
