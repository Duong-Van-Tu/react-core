/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { ModalOpportunityProvider } from '../../components/modals/opportunity';
import TableOpportunity from './table-opportunity';

export default function OpportunityPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Sale',
          en_US: 'Sale',
        },
      },
      {
        title: {
          vi_VN: 'Cơ hội',
          en_US: 'Opportunity',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return (
    <ModalOpportunityProvider>
      <TableOpportunity />
    </ModalOpportunityProvider>
  );
}
