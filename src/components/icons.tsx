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
import ThreeDot from '@/assets/svg/three-dot.svg?react';

type Props = {
  width?: number;
  height?: number;
  color?: string;
  type: string;
};

export const CustomIcon = (props: Props) => {
  const { type, color } = props;
  if (type === 'logo') {
    return <Logo {...props} />;
  }
  if (type === 'dot') {
    return <Dot {...props} />;
  }
  if (type === 'user') {
    return <User css={iconStyle(color!)} {...props} />;
  }
  if (type === 'user-group') {
    return <UserGroup css={iconStyle(color!)} {...props} />;
  }
  if (type === 'reports') {
    return <Report {...props} />;
  }
  if (type === 'setting') {
    return <Setting css={iconStyle(color!)} {...props} />;
  }
  if (type === 'bell') {
    return <Bell css={iconStyle(color!)} {...props} />;
  }
  if (type === 'payroll') {
    return <Payroll css={iconStyle(color!)} {...props} />;
  }
  if (type === 'languae') {
    return <Language css={iconStyle(color!)} {...props} />;
  }
  if (type === 'vi') {
    return <ViVN css={iconStyle(color!)} {...props} />;
  }
  if (type === 'en') {
    return <English css={iconStyle(color!)} {...props} />;
  }
  if (type === 'logout') {
    return <Logout css={iconStyle(color!)} {...props} />;
  }
  if (type === 'loading') {
    return <Loading css={iconStyle(color!)} {...props} />;
  }
  if (type === 'three-dot') {
    return <ThreeDot css={iconStyle(color!)} {...props} />;
  }
  return null;
};

const iconStyle = (color: string) => css`
  path {
    fill: ${color};
  }
`;
