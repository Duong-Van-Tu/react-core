/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { LogoIcon } from './icons';
import { Spinner } from './spinner';

export const PageIndicator = () => {
  return (
    <div css={indicatorStyle}>
      <LogoIcon width={100} height={100} />
      <Spinner width={50} height={50} />
    </div>
  );
};

const indicatorStyle = css`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: calc(100vh / 2 - 15rem);
`;
