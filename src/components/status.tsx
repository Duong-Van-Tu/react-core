/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type M = string | number;
type MessageProps = {
  type: MessageType;
  children: M[] | M;
  hasPadding?: boolean;
};
export const Status = ({ type, children }: MessageProps) => {
  return <div css={messageStyle(type)}>{children}</div>;
};

const messageStyle = (type: string) => css`
  font-size: 1.6rem;
  font-weight: 400;
  background: ${type === 'error'
    ? '#ffe6e6'
    : type === 'success'
      ? '#e6ffe6'
      : type === 'warning'
        ? '#fff7e6'
        : '#fff0cc'};

  color: ${type === 'error'
    ? '#cc0000'
    : type === 'success'
      ? '#299429'
      : type === 'warning'
        ? '#F1CB46'
        : '#ff9900'};
`;
