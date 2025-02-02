/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { CustomIcon } from './icons';

type SpinnerProps = {
  width?: number;
  height?: number;
  styles?: React.CSSProperties;
};
export function Spinner({ width, height, styles }: SpinnerProps) {
  return (
    <div css={spinnerStyle} style={styles}>
      <CustomIcon type="loading" width={width} height={height} color="#3498db" />
    </div>
  );
}

const spinnerStyle = css`
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
