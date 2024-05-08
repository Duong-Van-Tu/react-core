/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Spinner } from './spinner';
import logo from '@/assets/images/logo.png';

export const PageIndicator = () => {
  return (
    <div css={indicatorStyle}>
      <img src={logo} alt="logo" />
      <Spinner width={50} height={50} />
    </div>
  );
};

const indicatorStyle = css`
  min-height: calc(100vh - 8rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  img {
    width: 15rem;
    height: 12rem;
  }
`;
