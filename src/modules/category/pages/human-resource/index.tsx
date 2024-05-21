import { useEffect } from 'react';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
export default function HumanResourceCategoryPage() {
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
          vi_VN: 'Nhân sự',
          en_US: 'Human-resource',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return <div>HumanResourcePage</div>;
}
