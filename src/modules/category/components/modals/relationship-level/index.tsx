import { ModalRelationshipLevelType } from '@/modules/category/enum/relationship-level.enum';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { AddReltionshipLv } from './add.modal';
import { DeleteRelationshipLv } from './delete.relationshipLv';
import { UpdateReltionshipLv } from './update.relationshipLv';

type ModalContexttype = {
  openModal: (
    modalName: string,
    data?: DataReationshipLevelType,
    relationshipLvIds?: string[],
  ) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalRelationshipLv = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalRelationshipLv must be used within a ModalRelationshipLvProvider');
  }
  return context;
};

type ModalRelationshipLvProviderProps = {
  children?: ReactNode;
};

export const ModalRelationshipLvProvider = ({ children }: ModalRelationshipLvProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataReationshipLevelType; relationshipLvIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (
    modalName: string,
    data?: DataReationshipLevelType,
    relationshipLvIds?: string[],
  ) => {
    setCurrentModal({ modalName, data, relationshipLvIds });
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
        {currentModal?.modalName === ModalRelationshipLevelType.EditRelationLevel && (
          <UpdateReltionshipLv closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalRelationshipLevelType.DeleteRelationLevel && (
          <DeleteRelationshipLv
            closeModal={closeModal}
            data={currentModal.data!}
            relationshipLvIds={currentModal.relationshipLvIds!}
          />
        )}
        {currentModal?.modalName === ModalRelationshipLevelType.AddRelationLevel && (
          <AddReltionshipLv closeModal={closeModal} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
