import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalPrivilegesType } from '../../../enum/privileges.enum';
import { AddPrivileges } from './add.modal';
import { EmployeeReportPrivileges } from './employee-report-privileges';
import { EmployeeSuggestedEditPrivileges } from './employee-suggestedEdit-privileges';

type ModalContexttype = {
  openModal: (modalName: string) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalPrivileges = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalPrivileges must be used within a ModalPrivilegesProvider');
  }
  return context;
};

type ModalProviderProps = {
  children?: ReactNode;
};
export const ModalPrivilegesProvider = ({ children }: ModalProviderProps) => {
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
        {currentModal === ModalPrivilegesType.RequestEdit && <div>Request Edit Modal</div>}
        {currentModal === ModalPrivilegesType.Delete && <div>Delete Modal</div>}
        {currentModal === ModalPrivilegesType.SuggestedEdit && (
          <EmployeeSuggestedEditPrivileges closeModal={closeModal} />
        )}
        {currentModal === ModalPrivilegesType.Report && (
          <EmployeeReportPrivileges closeModal={closeModal} />
        )}
        {currentModal === ModalPrivilegesType.RefuseEdit && <div>RefuseEdit Modal</div>}
        {currentModal === ModalPrivilegesType.AddPrivileges && (
          <AddPrivileges closeModal={closeModal} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
