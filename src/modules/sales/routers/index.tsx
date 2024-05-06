import { Navigate, Route, Routes } from 'react-router-dom';
import Middleware from '@/middleware';
import LoginPage from '@/pages/login.page';
import MainLayout from '@/layouts/main.layout';
import KPIPage from '../pages/kpi.page';
import PrivilegesPage from '../pages/privileges.page';
import RelationshipPage from '../pages/relationship.page';
import OpportunityPage from '../pages/opportunity.page';
import SaleKitPage from '../pages/sale-kit.page';

function SaleRouter() {
  return (
    <Routes>
      <Route
        path="/kpi"
        element={
          <Middleware mode="private">
            <MainLayout>
              <KPIPage />
            </MainLayout>
          </Middleware>
        }
      />
      <Route
        path="/privileges"
        element={
          <Middleware mode="private">
            <MainLayout>
              <PrivilegesPage />
            </MainLayout>
          </Middleware>
        }
      />
      <Route
        path="/relationship"
        element={
          <Middleware mode="private">
            <MainLayout>
              <RelationshipPage />
            </MainLayout>
          </Middleware>
        }
      />
      <Route
        path="/opportunity"
        element={
          <Middleware mode="private">
            <MainLayout>
              <OpportunityPage />
            </MainLayout>
          </Middleware>
        }
      />
      <Route
        path="/sale-kit"
        element={
          <Middleware mode="private">
            <MainLayout>
              <SaleKitPage />
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
