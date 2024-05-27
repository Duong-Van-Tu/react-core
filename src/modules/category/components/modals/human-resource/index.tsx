import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalHumaResourceType } from '../../../enum/huma-resource.enum';

type ModalContexttype = {
  openModal: (modalName: string, data?: DataUserType) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalUserCategry = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalUserCategry must be used within a ModalUserCategoryProvider');
  }
  return context;
};

type ModalUserCategoryProviderProps = {
  children?: ReactNode;
};

export const ModalUserCategoryProvider = ({ children }: ModalUserCategoryProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataUserType } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataUserType) => {
    setCurrentModal({ modalName, data });
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
        {currentModal?.modalName === ModalHumaResourceType.EditHumanResource && (
          <div>Edit Modal</div>
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
