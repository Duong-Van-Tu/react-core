import { ModalQuestionGainsType } from '@/modules/category/enum/question-gains.enum';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { AddQuestionGain } from './add-questionGain.modal';
import { DeleteQuestionGain } from './delete-questionGain.modal';
import { UpdateQuestionGain } from './update-questionGain.modal';

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
        {currentModal?.modalName === ModalQuestionGainsType.EditQuestion && (
          <UpdateQuestionGain closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalQuestionGainsType.DeleteQuestion && (
          <DeleteQuestionGain
            closeModal={closeModal}
            data={currentModal.data!}
            questionIds={currentModal.questionIds!}
          />
        )}
        {currentModal?.modalName === ModalQuestionGainsType.AddQuestion && (
          <AddQuestionGain closeModal={closeModal} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
