import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalPrivilegesType } from '../../../enum/privileges.enum';
import { AddPrivileges } from './add-privileges.modal';
import { ReportPrivileges } from './report-privileges';
import { SuggestEditPrivileges } from './suggestedEdit-privileges';
import { EditPrivileges } from './edit-privileges.modal';

type ModalContextType = {
  openModal: (modalName: string, data?: DataBenefitType, benefitIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

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
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataBenefitType; benefitIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataBenefitType, benefitIds?: string[]) => {
    setCurrentModal({ modalName, data, benefitIds });
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
        {currentModal?.modalName === ModalPrivilegesType.Delete && <div>Delete Modal</div>}
        {currentModal?.modalName === ModalPrivilegesType.SuggestedEdit && (
          <SuggestEditPrivileges closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalPrivilegesType.Report && (
          <ReportPrivileges closeModal={closeModal} />
        )}
        {currentModal?.modalName === ModalPrivilegesType.AddPrivileges && (
          <AddPrivileges closeModal={closeModal} />
        )}
        {currentModal?.modalName === ModalPrivilegesType.EditPrivileges && (
          <EditPrivileges closeModal={closeModal} data={currentModal.data!} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
