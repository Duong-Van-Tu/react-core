import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';

export default function SaleKitPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const breadCrumbItems = [
      {
        title: 'Sales',
      },
      {
        title: 'Sale kit',
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);

  return <div>SaleKit Page</div>;
}
