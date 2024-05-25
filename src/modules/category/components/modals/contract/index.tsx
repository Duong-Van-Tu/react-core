import { ModalContractType } from '@/modules/category/enum/contract.enum';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { AddContract } from './add-contract.modal';
import { DeleteContract } from './delete-contract.modal';
import { UpdateContract } from './update-contract.modal';

type ModalContexttype = {
  openModal: (modalName: string, data?: DataContractType, contractIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalContract = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContract must be used within a ModalContractProvider');
  }
  return context;
};

type ModalContractProviderProps = {
  children?: ReactNode;
};

export const ModalContractProvider = ({ children }: ModalContractProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataContractType; contractIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataContractType, contractIds?: string[]) => {
    setCurrentModal({ modalName, data, contractIds });
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
        {currentModal?.modalName === ModalContractType.EditContract && (
          <UpdateContract closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalContractType.DeleteContract && (
          <DeleteContract
            closeModal={closeModal}
            data={currentModal.data!}
            contractIds={currentModal.contractIds!}
          />
        )}
        {currentModal?.modalName === ModalContractType.AddContract && (
          <AddContract closeModal={closeModal} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
