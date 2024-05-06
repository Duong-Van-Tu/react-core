import MainLayout from '@/layouts/main.layout';
import Middleware from '@/middleware';
import { useRoutes } from 'react-router-dom';
import KPIPage from '../pages/kpi.page';

export default function SaleRouter() {
  let element = useRoutes([
    {
      path: '/sales',
      children: [
        {
          path: 'kpi',
          element: (
            <Middleware mode="private">
              <MainLayout>
                <KPIPage />
              </MainLayout>
            </Middleware>
          ),
        },
      ],
    },
  ]);

  return element;
}
