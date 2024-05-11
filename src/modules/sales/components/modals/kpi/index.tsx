import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalKPIType } from '../../../enum/kpi.enum';

type ModalContexttype = {
  openModal: (modalName: string) => void;
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
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const openModal = (modalName: string) => {
    setCurrentModal(modalName);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {currentModal && (
        <Modal open={true} onCancel={closeModal} title={currentModal} footer={null}>
          {currentModal === ModalKPIType.RequestEdit && <div>Request Edit Modal</div>}
          {currentModal === ModalKPIType.SetKPI && <div>Set KPI Modal</div>}
          {currentModal === ModalKPIType.Evaluation && <div>Evaluation Modal</div>}
          {currentModal === ModalKPIType.Report && <div>Report Modal</div>}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
