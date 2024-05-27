import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { EditKPI } from './edit-kpi.modal';
import { FinalizeKPI } from './finalize-kpi.modal';
import { RequestEdit } from './request-edit-kpi.modal';
import { Report } from './report-kpi.modal';
import { ModifyKPI } from './modify-kpi.modal';
import { AddKPI } from './add-kpi.modal';
import { DeleteKPI } from './delete-kpi.modal';
import { UpdateRequest } from './update-request-kpi';
import { ModalKPIType } from '@/modules/sales/enum/modal.enum';

type ModalContextType = {
  openModal: (modalName: string, data?: DataKPIType, goalIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalKPI = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

type ModalProviderProps = {
  children?: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataKPIType; goalIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataKPIType, goalIds?: string[]) => {
    setCurrentModal({ modalName, data, goalIds });
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
          currentModal?.modalName === ModalKPIType.FinalizeKPI ||
          currentModal?.modalName === ModalKPIType.DeleteKPI
            ? '38rem'
            : currentModal?.modalName === ModalKPIType.RequestEdit
              ? '68rem'
              : '54rem'
        }
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        {currentModal?.modalName === ModalKPIType.EditKPI && (
          <EditKPI closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalKPIType.AddKPI && <AddKPI closeModal={closeModal} />}
        {currentModal?.modalName === ModalKPIType.FinalizeKPI && (
          <FinalizeKPI closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalKPIType.RequestEdit && (
          <RequestEdit closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalKPIType.Report && (
          <Report closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalKPIType.ModifyKPI && (
          <ModifyKPI closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalKPIType.DeleteKPI && (
          <DeleteKPI
            closeModal={closeModal}
            goalIds={currentModal.goalIds!}
            data={currentModal.data!}
          />
        )}
        {currentModal?.modalName === ModalKPIType.UpdateRequest && (
          <UpdateRequest closeModal={closeModal} data={currentModal.data!} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
