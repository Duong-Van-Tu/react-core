/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
import { ModalRelationshipLvProvider } from '../../components/modals/relationship-level';
import TableRelationshipLevel from './table-relationshipLevel';
import { useLocale } from '@/hooks/locale.hook';
export default function RelationshipLvPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
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
          vi_VN: 'Mức độ quan hệ',
          en_US: 'Relationship level',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return (
    <ModalRelationshipLvProvider>
      <h3 css={titleStyle}>{formatMessage({ id: 'title.document.relationshipLevel' })}</h3>
      <TableRelationshipLevel />
    </ModalRelationshipLvProvider>
  );
}
const titleStyle = css`
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
  color: rgba(16, 24, 40, 1);
  margin-bottom: 0.5rem;
`;
