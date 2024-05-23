import { ModalQuestionGainsType } from '@/modules/category/enum/question-gains.enum';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';

type ModalContexttype = {
  openModal: (modalName: string, data?: DataQuestionGainsType, questionIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalQuestionGains = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalQuestionGains must be used within a ModalQuestionGainsProvider');
  }
  return context;
};

type ModalQuestionGainsProviderProps = {
  children?: ReactNode;
};

export const ModalQuestionGainsProvider = ({ children }: ModalQuestionGainsProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataQuestionGainsType; questionIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataQuestionGainsType, questionIds?: string[]) => {
    setCurrentModal({ modalName, data, questionIds });
    setOpen(true);
  };

  const closeModal = () => {
    setCurrentModal(undefined);
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal open={open} onCancel={closeModal} footer={null}>
        {currentModal?.modalName === ModalQuestionGainsType.EditQuestion && <div>EditQuestion</div>}
        {currentModal?.modalName === ModalQuestionGainsType.DeleteQuestion && (
          <div>DeleteQuestion</div>
        )}
        {currentModal?.modalName === ModalQuestionGainsType.AddQuestion && <div>AddQuestion</div>}
      </Modal>
    </ModalContext.Provider>
  );
};
