import { useEffect } from 'react';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
export default function ServicePage() {
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
  return <div>ServicePage</div>;
}
