import { ModalRelationshipType } from '@/modules/sales/enum/modal.enum';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { DeleteRelationship } from './delete-relationship.modal';
import { AddRelationship } from './add-relationship.modal';
import { ReportRelationship } from './report-relationship';

type ModalContextType = {
  openModal: (modalName: string, data?: DataRelationshipType, relationshipIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalRelationship = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalRelationship must be used within a ModalRelationshipProvider');
  }
  return context;
};

type ModalProviderProps = {
  children?: ReactNode;
};
export const ModalRelationshipProvider = ({ children }: ModalProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataRelationshipType; relationshipIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (
    modalName: string,
    data?: DataRelationshipType,
    relationshipIds?: string[],
  ) => {
    setCurrentModal({ modalName, data, relationshipIds });
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
        width={
          currentModal?.modalName === ModalRelationshipType.DeleteRelationship
            ? '38rem'
            : currentModal?.modalName === ModalRelationshipType.ReportRelationship
              ? '50rem'
              : '54rem'
        }
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        {currentModal?.modalName === ModalRelationshipType.DeleteRelationship && (
          <DeleteRelationship
            closeModal={closeModal}
            data={currentModal.data!}
            relationshipIds={currentModal.relationshipIds!}
          />
        )}

        {currentModal?.modalName === ModalRelationshipType.AddRelationship && (
          <AddRelationship closeModal={closeModal} />
        )}

        {currentModal?.modalName === ModalRelationshipType.ReportRelationship && (
          <ReportRelationship closeModal={closeModal} data={currentModal.data!} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
