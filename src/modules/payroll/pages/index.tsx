import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useLocale } from '@/hooks/locale.hook';

export default function PayrollPage() {
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  useEffect(() => {
    const breadCrumbItems = [
      {
        title: formatMessage({ id: 'title.document.payroll' }),
      },
    ];
    dispatch(setBreadcrumbItemsAction(breadCrumbItems));
  }, [dispatch]);
  return <div>Payroll page</div>;
}
