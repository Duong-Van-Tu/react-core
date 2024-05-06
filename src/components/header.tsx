/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Avatar, Breadcrumb, Button, Layout } from 'antd';
import { useRootSelector } from '@/hooks/selector.hook';
import { BellIcon, SettingIcon } from './icons';

export default function Header() {
  const breadCrumbItems = useRootSelector((state) => state.breadcrumb.items);
  const { Header: HeaderAntd } = Layout;
  return (
    <HeaderAntd css={headerStyle}>
      {breadCrumbItems.length > 0 && (
        <Breadcrumb
          css={breadcrumbStyle}
          items={breadCrumbItems.map((item) =>
            item.link ? { title: <Link to={item.link}>{item.title}</Link> } : { title: item.title },
          )}
        />
      )}
      <div css={headerRightStyle}>
        <Link to="/settings" css={settingLinkStyle}>
          <SettingIcon width={20} height={20} />
        </Link>
        <Button css={bellBtn}>
          <BellIcon width={20} height={20} color="#020202" />
        </Button>
        <Avatar
          css={avatarStyle}
          src="https://images2.thanhnien.vn/528068263637045248/2023/4/23/edit-truc-anh-16822518118551137084698.png"
        />
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

const settingLinkStyle = css`
  display: flex;
  align-items: center;
`;

const bellBtn = css`
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
`;

const avatarStyle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
