import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';

export default function KPIPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: formatMessage({ id: 'title.breadcrumb.sale' }),
      },
      {
        title: formatMessage({ id: 'title.document.kpi' }),
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return <div>KPIPage</div>;
}
