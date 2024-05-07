/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Logo from '@/assets/svg/logo.svg?react';
import Users from '@/assets/svg/users.svg?react';
import Dot from '@/assets/svg/dot.svg?react';
import Report from '@/assets/svg/report.svg?react';
import Payroll from '@/assets/svg/payroll.svg?react';
import Setting from '@/assets/svg/cog.svg?react';
import Bell from '@/assets/svg/bell.svg?react';

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
    return <Users css={iconStyle(props)} {...props} />;
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
  return null;
};

const iconStyle = (props: Props) => css`
  path {
    fill: ${props.color};
    border: 1px solid ${props.color};
  }
`;
