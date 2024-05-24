import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalSaleKitType } from '../../../enum/sale-kit.enum';
import { DeleteSaleKits } from './delete-sale-kit.modal';
import { FilterSaleKitType } from '@/modules/sales/services/sale-kit.service';

type ModalContextType = {
  openModal: (modalName: string, data?: FilterSaleKitType) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalSaleKit = () => {
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
    { modalName: string; data?: FilterSaleKitType } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: FilterSaleKitType) => {
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
      <Modal
        width={currentModal?.modalName === ModalSaleKitType.Delete ? '38rem' : '50rem'}
        open={open}
        onCancel={closeModal}
        footer={null}
      >
        {currentModal?.modalName === ModalSaleKitType.Delete && (
          <DeleteSaleKits closeModal={closeModal} data={currentModal.data!} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
