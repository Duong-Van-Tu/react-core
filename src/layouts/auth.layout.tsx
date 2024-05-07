/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useEffect } from 'react';
import { Button, Dropdown, Layout } from 'antd';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useDispatch } from 'react-redux';
import { setLocaleAction } from '@/redux/slicers/locale.slice';
import { useRootSelector } from '@/hooks/selector.hook';
import { useLocale } from '@/hooks/locale.hook';
import { CustomIcon } from '@/components/icons';

type MainLayoutProps = {
  children: ReactNode;
};

const { Content, Header } = Layout;

export default function AuthLayout({ children }: MainLayoutProps) {
  const dispatch = useDispatch();
  const language = useRootSelector((state) => state.locale.language);

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setLocaleAction(key));
    localStorage.setItem('locale', key);
  };
  const { formatMessage } = useLocale();

  useEffect(() => {
    dispatch(setBreadcrumbItemsAction([]));
  }, [dispatch]);

  return (
    <Layout>
      <Header css={headerAuthStyle}>
        <div css={headerContainerStyle}>
          <Dropdown
            menu={{
              onClick: (info) => selectLocale(info),
              items: [
                {
                  key: 'vi_VN',
                  icon: <CustomIcon type="vi" width={20} height={20} />,
                  disabled: language === 'vi_VN',
                  label: formatMessage({ id: 'language.vietnamese' }),
                },
                {
                  key: 'en_US',
                  icon: <CustomIcon type="en" width={20} height={20} />,
                  disabled: language === 'en_US',
                  label: formatMessage({ id: 'language.english' }),
                },
              ],
            }}
          >
            <Button css={iconBtn}>
              <span>{formatMessage({ id: 'language.label' })}</span>
              <CustomIcon type="languae" width={20} height={20} />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content css={content}>{children}</Content>
    </Layout>
  );
}

const headerAuthStyle = css`
  background: #fff;
  justify-content: center;
  border-bottom: 0.5px solid #edebeb;
`;

const headerContainerStyle = css`
  max-width: 120rem;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const content = css`
  background: #fff;
`;

const iconBtn = css`
  display: flex;
  padding: 0;
  border: none;
  box-shadow: unset;
  gap: 6px;
  align-items: center;
  span {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;
