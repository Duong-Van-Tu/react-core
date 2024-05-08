import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';

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
          vi_VN: 'Quyền lợi',
          en_US: 'Opportunity',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return <div>Opportunity Page</div>;
}
