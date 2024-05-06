import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotfoundPage from '@/pages/notfound.page';
import LoginPage from '@/pages/login.page';
import Middleware from '@/middleware';
import MainLayout from '@/layouts/main.layout';
import KPIPage from '@/modules/sales/pages/kpi.page';
import PrivilegesPage from '@/modules/sales/pages/privileges.page';
import RelationshipPage from '@/modules/sales/pages/relationship.page';
import OpportunityPage from '@/modules/sales/pages/opportunity.page';
import SaleKitPage from '@/modules/sales/pages/sale-kit.page';
import { SettingPage } from '@/modules/settings/pages';
import PayrollPage from '@/modules/payroll/pages';
import { ReportPage } from '@/modules/reports/pages';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="sales/kpi"
          element={
            <Middleware mode="private">
              <MainLayout>
                <KPIPage />
              </MainLayout>
            </Middleware>
          }
        />
        <Route
          path="sales/privileges"
          element={
            <Middleware mode="private">
              <MainLayout>
                <PrivilegesPage />
              </MainLayout>
            </Middleware>
          }
        />
        <Route
          path="sales/relationship"
          element={
            <Middleware mode="private">
              <MainLayout>
                <RelationshipPage />
              </MainLayout>
            </Middleware>
          }
        />
        <Route
          path="sales/opportunity"
          element={
            <Middleware mode="private">
              <MainLayout>
                <OpportunityPage />
              </MainLayout>
            </Middleware>
          }
        />
        <Route
          path="sales/sale-kit"
          element={
            <Middleware mode="private">
              <MainLayout>
                <SaleKitPage />
              </MainLayout>
            </Middleware>
          }
        />
        <Route
          path="settings"
          element={
            <Middleware mode="private">
              <MainLayout>
                <SettingPage />
              </MainLayout>
            </Middleware>
          }
        />
        <Route
          path="payroll"
          element={
            <Middleware mode="private">
              <MainLayout>
                <PayrollPage />
              </MainLayout>
            </Middleware>
          }
        />
        <Route
          path="reports"
          element={
            <Middleware mode="private">
              <MainLayout>
                <ReportPage />
              </MainLayout>
            </Middleware>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="not-found" element={<NotfoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
