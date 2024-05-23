import { lazy } from 'react';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import Middleware from '@/middleware';
import MainLayout from '@/layouts/main.layout';

import WrapperRouteComponent from './config';
import AuthLayout from '@/layouts/auth.layout';
import { AddOpportuity } from '@/modules/sales/components/forms/opportuity/add-opportuity';
import { UpdateOpportunity } from '@/modules/sales/components/modals/opportunity/update-opportunity';
import { ReportOpportunity } from '@/modules/sales/components/modals/opportunity/report-opportunity';
import { UpdateHistoryOpportunity } from '@/modules/sales/components/modals/opportunity/update-history-opportunity';
import { EditOpportuity } from '@/modules/sales/components/forms/opportuity/edit-opportuity';
import { TicketIncomeDetails } from '@/modules/users/pages/income/details-view';
import CustomerPage from '@/modules/category/pages/customer';
import HumanResourcePage from '@/modules/category/pages/human-resource';
import QuestionrPage from '@/modules/category/pages/questions';
import SaleKitCategoryPage from '@/modules/category/pages/sale-kit';
import ServicePage from '@/modules/category/pages/service';
import SupplierPage from '@/modules/category/pages/supplier';
import RelationshipCategoryPage from '@/modules/category/pages/relationship';
import HumanResourceCategoryPage from '@/modules/category/pages/human-resource';
import { SaleKitAuth } from '@/modules/sales/pages/sale-kit/sale.kit.auth';

const KPIPage = lazy(() => import(/* webpackChunkName: "kpi"*/ '@/modules/sales/pages/kpi'));
const PrivilegesPage = lazy(
  () => import(/* webpackChunkName: "privileges"*/ '@/modules/sales/pages/privileges'),
);
const RelationshipPage = lazy(
  () => import(/* webpackChunkName: "relationship"*/ '@/modules/sales/pages/relationship'),
);
const OpportunityPage = lazy(
  () => import(/* webpackChunkName: "opportunity"*/ '@/modules/sales/pages/opportunity'),
);
const SaleKitPage = lazy(
  () => import(/* webpackChunkName: "sale-kit"*/ '@/modules/sales/pages/sale-kit'),
);
const SettingPage = lazy(
  () => import(/* webpackChunkName: "settings"*/ '@/modules/settings/pages'),
);
const ReportPage = lazy(() => import(/* webpackChunkName: "settings"*/ '@/modules/reports/pages'));
const PayrollPage = lazy(() => import(/* webpackChunkName: "payroll"*/ '@/modules/payroll/pages'));
const NotfoundPage = lazy(() => import(/* webpackChunkName: "notfound"*/ '@/pages/notfound.page'));
const LoginPage = lazy(() => import(/* webpackChunkName: "login"*/ '@/pages/login.page'));
const ForgotPasswordPage = lazy(
  () => import(/* webpackChunkName: "forgot-password"*/ '@/pages/forgot-password.page'),
);
const EmailVerificationPage = lazy(
  () => import(/* webpackChunkName: "email-verification"*/ '@/pages/email-verification.page'),
);
const ResetPasswordPage = lazy(
  () => import(/* webpackChunkName: "reset-password"*/ '@/pages/reset-password.page'),
);

const InforPesonnelPage = lazy(
  () => import(/* webpackChunkName: "inforPersonnel"*/ '@/modules/users/pages/human-resources'),
);
const InforIncomePage = lazy(
  () => import(/* webpackChunkName: "inforPersonnel"*/ '@/modules/users/pages/income'),
);

const routes: RouteObject[] = [
  {
    path: '/auth',
    element: (
      <WrapperRouteComponent titleId="">
        <Middleware mode="non-login">
          <AuthLayout />
        </Middleware>
      </WrapperRouteComponent>
    ),
    children: [
      {
        path: 'login',
        element: (
          <WrapperRouteComponent titleId="title.form.login">
            <LoginPage />
          </WrapperRouteComponent>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <WrapperRouteComponent titleId="title.form.resetPassword">
            <ResetPasswordPage />
          </WrapperRouteComponent>
        ),
      },
      {
        path: 'email-verification',
        element: (
          <WrapperRouteComponent titleId="title.form.emailVerification">
            <EmailVerificationPage />
          </WrapperRouteComponent>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <WrapperRouteComponent titleId="title.form.forgotPassword">
            <ForgotPasswordPage />
          </WrapperRouteComponent>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <Middleware mode="private">
        <WrapperRouteComponent titleId="">
          <MainLayout />
        </WrapperRouteComponent>
      </Middleware>
    ),
    children: [
      {
        path: '/sales',
        children: [
          {
            path: 'kpi',
            element: (
              <WrapperRouteComponent titleId="title.document.kpi">
                <KPIPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'privileges',
            element: (
              <WrapperRouteComponent titleId="title.document.privileges">
                <PrivilegesPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'relationship',
            element: (
              <WrapperRouteComponent titleId="title.document.relationship">
                <RelationshipPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'opportunity',
            element: (
              <WrapperRouteComponent titleId="title.document.opportunity">
                <OpportunityPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'sale-kit',
            element: (
              <WrapperRouteComponent titleId="title.document.saleKit">
                <SaleKitPage />
              </WrapperRouteComponent>
            ),
          },
        ],
      },

      {
        path: '/users',
        children: [
          {
            path: 'human-resources',
            element: (
              <WrapperRouteComponent titleId="title.document.inforPersonnel">
                <InforPesonnelPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'income',
            element: (
              <WrapperRouteComponent titleId="title.document.inforIncome">
                <InforIncomePage />
              </WrapperRouteComponent>
            ),
          },
        ],
      },

      {
        path: '/category',
        children: [
          {
            path: 'customer',
            element: (
              <WrapperRouteComponent titleId="title.document.customer">
                <CustomerPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'human-resource',
            element: (
              <WrapperRouteComponent titleId="title.document.human-resource">
                <HumanResourceCategoryPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'supplier',
            element: (
              <WrapperRouteComponent titleId="title.document.supplier">
                <SupplierPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'service',
            element: (
              <WrapperRouteComponent titleId="title.document.service">
                <ServicePage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'relationship',
            element: (
              <WrapperRouteComponent titleId="title.document.relationship">
                <RelationshipCategoryPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'questions',
            element: (
              <WrapperRouteComponent titleId="title.document.questions">
                <QuestionrPage />
              </WrapperRouteComponent>
            ),
          },
          {
            path: 'sale-kit',
            element: (
              <WrapperRouteComponent titleId="title.document.saleKit">
                <SaleKitCategoryPage />
              </WrapperRouteComponent>
            ),
          },
        ],
      },

      {
        path: 'settings',
        element: (
          <WrapperRouteComponent titleId="title.document.setting">
            <SettingPage />
          </WrapperRouteComponent>
        ),
      },
      {
        path: 'payroll',
        element: (
          <WrapperRouteComponent titleId="title.document.payroll">
            <PayrollPage />
          </WrapperRouteComponent>
        ),
      },
      {
        path: 'reports',
        element: (
          <WrapperRouteComponent titleId="title.document.report">
            <ReportPage />
          </WrapperRouteComponent>
        ),
      },
    ],
  },
  {
    path: 'not-found',
    element: <NotfoundPage />,
  },
  {
    path: '/sales/opportunity/add-opportunity',
    element: (
      <WrapperRouteComponent titleId="title.document.addOpportunity">
        <Middleware mode="private">
          <AddOpportuity />
        </Middleware>
      </WrapperRouteComponent>
    ),
  },
  {
    path: '/sales/opportunity/:id',
    element: (
      <WrapperRouteComponent titleId="title.document.editOpportunity">
        <Middleware mode="private">
          <EditOpportuity />
        </Middleware>
      </WrapperRouteComponent>
    ),
  },
  {
    path: '/sales/opportunity/update-opportunity',
    element: (
      <WrapperRouteComponent titleId="title.document.updateOpportunity">
        <UpdateOpportunity />
      </WrapperRouteComponent>
    ),
  },
  {
    path: '/sales/opportunity/report-opportunity',
    element: (
      <WrapperRouteComponent titleId="title.document.reportOpportunity">
        <ReportOpportunity />
      </WrapperRouteComponent>
    ),
  },
  {
    path: '/sales/opportunity/update-opportunity/update-history',
    element: (
      <WrapperRouteComponent titleId="title.document.updateHistory">
        <UpdateHistoryOpportunity />
      </WrapperRouteComponent>
    ),
  },
  {
    path: '/sales/sale-kit/auth',
    element: (
      <WrapperRouteComponent titleId="title.document.addOpportunity">
        <Middleware mode="private">
          <SaleKitAuth />
        </Middleware>
      </WrapperRouteComponent>
    ),
  },
  {
    path: '/personnel/infor-income/details-view',
    element: (
      <WrapperRouteComponent titleId="title.document.detailsView">
        <TicketIncomeDetails />
      </WrapperRouteComponent>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
];
export const router = createBrowserRouter(routes);
