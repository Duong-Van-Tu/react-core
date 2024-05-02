import { Navigate, Route, Routes } from 'react-router-dom';
import SaleIndexPage from '../pages';
import Middleware from '../../../middlewares';
import LoginPage from '../../../pages/login.page';
import MainLayout from '../../../layouts/main.layout';

function SaleRouter() {
  return (
    <Routes>
      <Route
        index
        element={
          <Middleware mode="private">
            <MainLayout>
              <SaleIndexPage />
            </MainLayout>
          </Middleware>
        }
      />
      <Route
        path="/login"
        element={
          <Middleware mode="non-login">
            <LoginPage />
          </Middleware>
        }
      />
      <Route path="/*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}

export default SaleRouter;
