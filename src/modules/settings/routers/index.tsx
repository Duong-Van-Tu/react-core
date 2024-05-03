import { Navigate, Route, Routes } from 'react-router-dom';
import Middleware from '../../../middlewares';
import LoginPage from '../../../pages/login.page';
import MainLayout from '../../../layouts/main.layout';
import { SettingPage } from '../pages';

function SettingRouter() {
  return (
    <Routes>
      <Route
        index
        element={
          <Middleware mode="private">
            <MainLayout>
              <SettingPage />
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

export default SettingRouter;
