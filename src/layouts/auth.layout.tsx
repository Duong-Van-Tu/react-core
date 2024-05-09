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
import bgFooter from '@/assets/images/bg-footer.png';

type MainLayoutProps = {
  children: ReactNode;
};

const { Content, Header } = Layout;

export default function AuthLayout({ children }: MainLayoutProps) {
  const dispatch = useDispatch();
  const language = useRootSelector((state) => state.locale.language);

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setLocaleAction(key));
  };
  const { formatMessage } = useLocale();

  useEffect(() => {
    dispatch(setBreadcrumbItemsAction([]));
  }, [dispatch]);

  return (
    <Layout css={layoutStyle}>
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

const layoutStyle = css`
  min-height: 100vh;
`;

const headerAuthStyle = css`
  background: #fff;
  justify-content: center;
  border-bottom: 0.5px solid #edebeb;
  padding-right: 2rem;
`;

const headerContainerStyle = css`
  max-width: 130rem;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const content = css`
  background: #fff;
  padding-top: 10rem;
  background-image: url(${bgFooter});
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: 100% 50%;
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
