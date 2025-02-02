/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { AssignOpportunity } from './assign-opportunity';
import { CloseOpportunity } from './close-opportunity';
import { DeleteOpportunity } from './delete-opportunity';
import { CreateHistoryOpportunity } from './create-HistoryOpportunity';
import { ModalOpportunityType } from '@/modules/sales/enum/modal.enum';

type ModalContextType = {
  openModal: (modalName: string, data?: DataOpportunityType, opportunityIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

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
    { modalName: string; data?: DataOpportunityType; opportunityIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);
  const openModal = (modalName: string, data?: DataOpportunityType, opportunityIds?: string[]) => {
    setCurrentModal({ modalName, data, opportunityIds });
    setOpen(true);
  };

  const closeModal = () => {
    setCurrentModal(undefined);
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal
        css={modalStyle(currentModal?.modalName!)}
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        {currentModal?.modalName === ModalOpportunityType.AssignOpportunity && (
          <AssignOpportunity closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalOpportunityType.CloseOpportunity && (
          <CloseOpportunity closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalOpportunityType.Delete && (
          <DeleteOpportunity
            closeModal={closeModal}
            data={currentModal.data!}
            opportunityIds={currentModal.opportunityIds!}
          />
        )}
        {currentModal?.modalName === ModalOpportunityType.CreateHistoryOpportunity && (
          <CreateHistoryOpportunity closeModal={closeModal} data={currentModal.data!} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};

const modalStyle = (modalName: string) => css`
  width: ${modalName === ModalOpportunityType.Delete ? '40rem' : '52rem'} !important;
`;
