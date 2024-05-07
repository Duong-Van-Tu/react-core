/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Logo from '@/assets/svg/logo.svg?react';
import UserGroup from '@/assets/svg/user-group.svg?react';
import User from '@/assets/svg/user.svg?react';
import Dot from '@/assets/svg/dot.svg?react';
import Report from '@/assets/svg/report.svg?react';
import Payroll from '@/assets/svg/payroll.svg?react';
import Setting from '@/assets/svg/cog.svg?react';
import Bell from '@/assets/svg/bell.svg?react';
import Language from '@/assets/svg/icon_Google_Translate_logo.svg?react';
import ViVN from '@/assets/svg/vi_VN.svg?react';
import English from '@/assets/svg/english.svg?react';
import Logout from '@/assets/svg/logout.svg?react';
import Loading from '@/assets/svg/loading.svg?react';

type Props = {
  width?: number;
  height?: number;
  color?: string;
  type: string;
};
export const CustomIcon = (props: Props) => {
  const { type } = props;
  if (type === 'logo') {
    return <Logo {...props} />;
  }
  if (type === 'dot') {
    return <Dot {...props} />;
  }
  if (type === 'user') {
    return <User css={iconStyle(props)} {...props} />;
  }
  if (type === 'user-group') {
    return <UserGroup css={iconStyle(props)} {...props} />;
  }
  if (type === 'reports') {
    return <Report {...props} />;
  }
  if (type === 'setting') {
    return <Setting {...props} />;
  }
  if (type === 'bell') {
    return <Bell css={iconStyle(props)} {...props} />;
  }
  if (type === 'payroll') {
    return <Payroll {...props} />;
  }
  if (type === 'languae') {
    return <Language css={iconStyle(props)} {...props} />;
  }
  if (type === 'vi') {
    return <ViVN css={iconStyle(props)} {...props} />;
  }
  if (type === 'en') {
    return <English css={iconStyle(props)} {...props} />;
  }
  if (type === 'logout') {
    return <Logout css={iconStyle(props)} {...props} />;
  }
  if (type === 'loading') {
    return <Loading css={iconStyle(props)} {...props} />;
  }
  return null;
};

const iconStyle = (props: Props) => css`
  path {
    fill: ${props.color};
    border: 1px solid ${props.color};
  }
`;
