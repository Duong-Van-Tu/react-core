import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalOpportunityType } from '../../../enum/opportunity.enum';
import { AssignOpportunity } from './assign-opportuity';
import { CloseOpportuity } from './close-opportuity';

type ModalContexttype = {
  openModal: (modalName: string, data?: DataOpportunityType) => void;
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
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataOpportunityType } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataOpportunityType) => {
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
        {currentModal?.modalName === ModalOpportunityType.AssignOpportunity && (
          <AssignOpportunity closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalOpportunityType.CloseOpportunity && (
          <CloseOpportuity closeModal={closeModal} />
        )}
        {currentModal?.modalName === ModalOpportunityType.Delete && <div>Delete Modal</div>}
      </Modal>
    </ModalContext.Provider>
  );
};
