import { ReactComponent as Logo } from '../assets/svg/logo.svg';
type Props = {
  width?: number;
  height?: number;
};

export const LogoIcon = (props: Props) => {
  return <Logo {...props} />;
};
