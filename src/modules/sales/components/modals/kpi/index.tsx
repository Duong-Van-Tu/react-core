import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalKPIType } from '../../../enum/kpi.enum';
import { EditKPI } from './edit.modal';
import { FinalizeKPI } from './finalize.modal';
import { RequestEdit } from './request-edit.modal';
import { Report } from './report.modal';
import { ModifyKPI } from './modify.modal';
import { AddKPI } from './add.modal';

type ModalContexttype = {
  openModal: (modalName: string) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

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
      <Modal
        width={currentModal === ModalKPIType.FinalizeKPI ? '34rem' : '52rem'}
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        {currentModal === ModalKPIType.EditKPI && <EditKPI closeModal={closeModal} />}
        {currentModal === ModalKPIType.AddKPI && <AddKPI closeModal={closeModal} />}
        {currentModal === ModalKPIType.FinalizeKPI && <FinalizeKPI closeModal={closeModal} />}
        {currentModal === ModalKPIType.RequestEdit && <RequestEdit closeModal={closeModal} />}
        {currentModal === ModalKPIType.Report && <Report closeModal={closeModal} />}
        {currentModal === ModalKPIType.ModifyKPI && <ModifyKPI closeModal={closeModal} />}
      </Modal>
    </ModalContext.Provider>
  );
};
