/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { LogoIcon } from './icons';
import { Spinner } from './spinner';

export const PageIndicator = () => {
  return (
    <div css={indicatorStyle}>
      <LogoIcon width={100} height={100} />
      <Spinner width={60} height={60} />
    </div>
  );
};

const indicatorStyle = css`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
`;
