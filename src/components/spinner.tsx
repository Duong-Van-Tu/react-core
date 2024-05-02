/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

type SpinnerProps = {
  width: number;
  height: number;
};
export function Spinner({ width, height }: SpinnerProps) {
  return <div css={spinnerStyle(width, height)}></div>;
}

const spinnerStyle = (width: number, height: number) => css`
  border: 0.4rem solid #f3f3f3;
  border-top: 0.4rem solid #3498db;
  border-radius: 50%;
  width: ${width / 10}rem;
  height: ${height / 10}rem;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
