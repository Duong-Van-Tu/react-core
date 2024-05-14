/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Breadcrumb, Button, Dropdown, Layout, Tooltip } from 'antd';
import { setLocaleAction } from '@/redux/slicers/locale.slice';
import { useLocale } from '@/hooks/locale.hook';
import { useRootSelector } from '@/hooks/selector.hook';
import { CustomIcon } from './icons';
import Notice from './notice';
import { useAuth } from '@/hooks/auth.hook';

export default function Header() {
  const dispatch = useDispatch();
  const breadCrumbItems = useRootSelector((state) => state.breadcrumb.items);
  const language = useRootSelector((state) => state.locale.language);
  const { formatMessage } = useLocale();
  const { logged, clearData } = useAuth();
  const { Header: HeaderAntd } = Layout;
  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setLocaleAction(key));
  };

  return (
    <HeaderAntd css={headerStyle}>
      <div>
        {breadCrumbItems.length > 0 && (
          <Breadcrumb
            css={breadcrumbStyle}
            items={breadCrumbItems.map((item) =>
              item.link
                ? { title: <Link to={item.link}>{item.title[language]}</Link> }
                : { title: item.title[language] },
            )}
          />
        )}
      </div>
      <div css={headerRightStyle}>
        <Dropdown
          placement="bottomRight"
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
            <CustomIcon type="languae" width={18} height={18} />
          </Button>
        </Dropdown>
        <Tooltip title={formatMessage({ id: 'title.document.setting' })}>
          <Button css={iconBtn}>
            <CustomIcon type="setting" width={20} height={20} />
          </Button>
        </Tooltip>
        <Notice />
        {logged && (
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  icon: <CustomIcon type="user" width={18} height={18} />,
                  label: formatMessage({
                    id: 'header.avatar.account',
                  }),
                },
                {
                  key: '2',
                  icon: <CustomIcon type="logout" width={18} height={18} />,
                  label: formatMessage({
                    id: 'header.avatar.logout',
                  }),
                  onClick: () => clearData(),
                },
              ],
            }}
          >
            <Avatar
              css={avatarStyle}
              src="https://images2.thanhnien.vn/528068263637045248/2023/4/23/edit-truc-anh-16822518118551137084698.png"
            />
          </Dropdown>
        )}
      </div>
    </HeaderAntd>
  );
}
const headerStyle = css`
  background: #fff;
  padding: 0 3rem;
  border-bottom: 0.5px solid #edebeb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const headerRightStyle = css`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

const breadcrumbStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  li:last-child {
    .ant-breadcrumb-link a {
      color: #1f1e1e;
    }
  }
`;

const iconBtn = css`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  box-shadow: unset;
`;

const avatarStyle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
