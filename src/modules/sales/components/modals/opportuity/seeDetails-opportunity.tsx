/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Modal } from 'antd';
import { UpdateDetailsOpportunity } from './updateDetails-opportunity';

export const SeeDetailsOpportunity = () => {
  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => {
    console.log('open: ', open);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div>
      <p css={titleDetailsStyle} onClick={() => openModal()}>
        Xem chi tiết
      </p>
      <Modal open={open} onCancel={closeModal} footer={null}>
        <UpdateDetailsOpportunity closeModal={closeModal} />
      </Modal>
    </div>
  );
};

const titleDetailsStyle = css`
  font-size: 1.4rem;
  color: #42526d;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
`;
