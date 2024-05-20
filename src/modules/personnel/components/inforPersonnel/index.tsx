import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';

type ModalContexttype = {
  openModal: (modalName: string) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalInforPersonnel = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalInforPersonnel must be used within a ModalInforPersonnelProvider');
  }
  return context;
};

type ModalInforPersonnelProps = {
  children?: ReactNode;
};
export const ModalInforPersonnelProvider = ({ children }: ModalInforPersonnelProps) => {
  const [currentModal, setCurrentModal] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string) => {
    setCurrentModal(modalName);
    setOpen(true);
  };

  const closeModal = () => {
    setCurrentModal(undefined);
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal open={open} onCancel={closeModal} footer={null}></Modal>
    </ModalContext.Provider>
  );
};
