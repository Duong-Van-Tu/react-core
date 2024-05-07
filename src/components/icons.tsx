/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Logo from '@/assets/svg/logo.svg?react';
import Users from '@/assets/svg/users.svg?react';
import Dot from '@/assets/svg/dot.svg?react';
import Report from '@/assets/svg/report.svg?react';
import Payroll from '@/assets/svg/payroll.svg?react';
import Setting from '@/assets/svg/cog.svg?react';
import Bell from '@/assets/svg/bell.svg?react';
import Language from '@/assets/svg/icon_Google_Translate_logo.svg?react';
import ViVN from '@/assets/svg/vi_VN.svg?react';
import English from '@/assets/svg/english.svg?react';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const LogoIcon = (props: Props) => {
  return <Logo {...props} />;
};

export const UsersIcon = (props: Props) => {
  return <Users css={iconStyle(props)} {...props} />;
};

export const DotIcon = (props: Props) => {
  return <Dot {...props} />;
};

export const ReportIcon = (props: Props) => {
  return <Report {...props} />;
};

export const PayrollIcon = (props: Props) => {
  return <Payroll {...props} />;
};

export const SettingIcon = (props: Props) => {
  return <Setting {...props} />;
};

export const BellIcon = (props: Props) => {
  return <Bell css={iconStyle(props)} {...props} />;
};

export const LanguageIcon = (props: Props) => {
  return <Language css={iconStyle(props)} {...props} />;
};

export const ViVNIcon = (props: Props) => {
  return <ViVN css={iconStyle(props)} {...props} />;
};

export const EnglishIcon = (props: Props) => {
  return <English css={iconStyle(props)} {...props} />;
};
const iconStyle = (props: Props) => css`
  path {
    fill: ${props.color};
    border: 1px solid ${props.color};
  }
`;
