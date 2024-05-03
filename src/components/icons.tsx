/** @jsxImportSource @emotion/react */
import { ReactComponent as Logo } from '../assets/svg/logo.svg';
import { ReactComponent as Users } from '../assets/svg/users.svg';
import { ReactComponent as Dot } from '../assets/svg/dot.svg';
import { css } from '@emotion/react';
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

const iconStyle = (props: Props) => css`
  path {
    fill: ${props.color};
  }
`;
