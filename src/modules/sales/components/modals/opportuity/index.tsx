import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalOpportunityType } from '../../../enum/opportunity.enum';
import { AssignOpportuity } from './assign-opportuity';
import { CloseOpportuity } from './close-opportuity';
import { AddUpdateOpportuity } from './add-update-opportuity';

type ModalContexttype = {
  openModal: (modalName: string) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalOpportunity = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useOpportunityModal must be used within a ModalOpportunityProvider');
  }
  return context;
};

type ModalProviderProps = {
  children?: ReactNode;
};
export const ModalOpportunityProvider = ({ children }: ModalProviderProps) => {
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
      <Modal open={open} onCancel={closeModal} footer={null}>
        {currentModal === ModalOpportunityType.RequestEdit && <div>Request Edit Modal</div>}
        {currentModal === ModalOpportunityType.AssignOpportunity && (
          <AssignOpportuity closeModal={closeModal} />
        )}
        {currentModal === ModalOpportunityType.CloseOpportunity && (
          <CloseOpportuity closeModal={closeModal} />
        )}
        {currentModal === ModalOpportunityType.Report && <div>Report Modal</div>}
        {currentModal === ModalOpportunityType.Delete && <div>Delete Modal</div>}
      </Modal>
    </ModalContext.Provider>
  );
};
