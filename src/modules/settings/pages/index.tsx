import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';

export default function SettingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: {
          vi_VN: 'Setting',
          en_US: 'Setting',
        },
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return <div>Setting page</div>;
}
