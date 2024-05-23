/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Suspense, useEffect } from 'react';
import { Layout } from 'antd';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbItemsAction([]));
  }, [dispatch]);

  return (
    <Layout css={layoutStyle}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const layoutStyle = css`
  min-height: 100vh;
  background: #fff;
`;
