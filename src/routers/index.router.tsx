import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotfoundPage from '../components/notfound-page';
import MainLayout from '../layouts/main.layout';
import SaleRouter from '../modules/sales/routers';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="sales/*"
          element={
            <MainLayout>
              <SaleRouter />
            </MainLayout>
          }
        />
        <Route path="not-found" element={<NotfoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
