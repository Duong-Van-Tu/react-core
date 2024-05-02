import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotfoundPage from '../pages/notfound.page';
import SaleRouter from '../modules/sales/routers';
import LoginPage from '../pages/login.page';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="sales/*" element={<SaleRouter />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="not-found" element={<NotfoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
