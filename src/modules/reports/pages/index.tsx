import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';

export default function ReportPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Report',
          en_US: 'Report',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return <div>Report page</div>;
}
