import { Navigate, Route, Routes } from 'react-router-dom';
import Middleware from '../../../middleware';
import LoginPage from '../../../pages/login.page';
import MainLayout from '../../../layouts/main.layout';
import PayrollPage from '../pages';

export default function PayrollRouter() {
  return (
    <Routes>
      <Route
        index
        element={
          <Middleware mode="private">
            <MainLayout>
              <PayrollPage />
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
