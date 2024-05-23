/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type M = string | number;
type MessageProps = {
  type: MessageType;
  children: M[] | M;
  hasBackground?: boolean;
};
export const Message = ({ type, children, hasBackground }: MessageProps) => {
  return <div css={messageStyle(type, hasBackground!)}>{children}</div>;
};

const messageStyle = (type: string, hasBackground: boolean) => css`
  font-size: 1.4rem;
  font-weight: 400;
  ${hasBackground &&
  `background: ${
    type === 'error'
      ? '#ffe6e6'
      : type === 'success'
        ? '#abf0ab'
        : type === 'warning'
          ? '#fff7e6'
          : '#fff0cc'
  };
  padding: 4px 8px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  `}
  color: ${type === 'error'
    ? '#cc0000'
    : type === 'success'
      ? '#299429'
      : type === 'warning'
        ? '#F1CB46'
        : '#ff9900'};
`;
