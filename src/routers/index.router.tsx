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
import WrapperRouteComponent from './config';
import { PageIndicator } from '@/components/page-indicator';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Middleware mode="non-login">
              <PageIndicator />
            </Middleware>
          }
        />
        <Route
          path="sales/kpi"
          element={
            <WrapperRouteComponent titleId="title.document.kpi">
              <Middleware mode="private">
                <MainLayout>
                  <KPIPage />
                </MainLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="sales/privileges"
          element={
            <WrapperRouteComponent titleId="title.document.privileges">
              <Middleware mode="private">
                <MainLayout>
                  <PrivilegesPage />
                </MainLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="sales/relationship"
          element={
            <WrapperRouteComponent titleId="title.document.relationship">
              <Middleware mode="private">
                <MainLayout>
                  <RelationshipPage />
                </MainLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="sales/opportunity"
          element={
            <WrapperRouteComponent titleId="title.document.opportunity">
              <Middleware mode="private">
                <MainLayout>
                  <OpportunityPage />
                </MainLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="sales/sale-kit"
          element={
            <WrapperRouteComponent titleId="title.document.saleKit">
              <Middleware mode="private">
                <MainLayout>
                  <SaleKitPage />
                </MainLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="settings"
          element={
            <WrapperRouteComponent titleId="title.document.setting">
              <Middleware mode="private">
                <MainLayout>
                  <SettingPage />
                </MainLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />

        <Route
          path="payroll"
          element={
            <WrapperRouteComponent titleId="title.document.payroll">
              <Middleware mode="private">
                <MainLayout>
                  <PayrollPage />
                </MainLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />

        <Route
          path="reports"
          element={
            <WrapperRouteComponent titleId="title.document.report">
              <Middleware mode="private">
                <MainLayout>
                  <ReportPage />
                </MainLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="login"
          element={
            <WrapperRouteComponent titleId="title.form.login">
              <LoginPage />
            </WrapperRouteComponent>
          }
        />
        <Route path="not-found" element={<NotfoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
