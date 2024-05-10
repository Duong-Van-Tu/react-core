import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotfoundPage from '@/pages/notfound.page';
import LoginPage from '@/pages/login.page';
import Middleware from '@/middleware';
import MainLayout from '@/layouts/main.layout';
import KPIPage from '@/modules/sales/pages/kpi';
import PrivilegesPage from '@/modules/sales/pages/privileges';
import RelationshipPage from '@/modules/sales/pages/relationship';
import OpportunityPage from '@/modules/sales/pages/opportunity';
import SaleKitPage from '@/modules/sales/pages/sale-kit.page';
import { SettingPage } from '@/modules/settings/pages';
import PayrollPage from '@/modules/payroll/pages';
import { ReportPage } from '@/modules/reports/pages';
import WrapperRouteComponent from './config';
import { PageIndicator } from '@/components/page-indicator';
import AuthLayout from '@/layouts/auth.layout';
import ForgotPasswordPage from '@/pages/forgot-password.page';
import EmailVerificationPage from '@/pages/email-verification.page';
import ResetPasswordPage from '@/pages/reset-password.page';

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
              <Middleware mode="non-login">
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="forgot-password"
          element={
            <WrapperRouteComponent titleId="title.form.forgotPassword">
              <Middleware mode="public">
                <AuthLayout>
                  <ForgotPasswordPage />
                </AuthLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="email-verification"
          element={
            <WrapperRouteComponent titleId="title.form.emailVerification">
              <Middleware mode="public">
                <AuthLayout>
                  <EmailVerificationPage />
                </AuthLayout>
              </Middleware>
            </WrapperRouteComponent>
          }
        />
        <Route
          path="reset-password"
          element={
            <WrapperRouteComponent titleId="title.form.resetPassword">
              <Middleware mode="public">
                <AuthLayout>
                  <ResetPasswordPage />
                </AuthLayout>
              </Middleware>
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
