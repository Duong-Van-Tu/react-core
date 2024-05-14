/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type M = string | number;
type MessageProps = {
  type: MessageType;
  children: M[] | M;
  hasPadding?: boolean;
};
export const Message = ({ type, children }: MessageProps) => {
  return <div css={messageStyle(type)}>{children}</div>;
};

const messageStyle = (type: string) => css`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${type === 'error' ? '#cc0000' : type === 'success' ? '#008000' : '#ff9900'};
`;
