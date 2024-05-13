/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Spinner } from './spinner';
import { CustomIcon } from './icons';

export default function PageIndicator() {
  return (
    <div css={indicatorStyle}>
      <CustomIcon type="logo" height={90} width={90} />
      <Spinner width={50} height={50} />
    </div>
  );
}

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
