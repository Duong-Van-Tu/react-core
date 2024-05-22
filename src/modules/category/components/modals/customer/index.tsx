import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { ModalCustomerType } from '../../../enum/customer.enum';
import { AddCustomer } from './add.modal';
import { DeleteCustomer } from './delete.customer';

type ModalContexttype = {
  openModal: (modalName: string, data?: DataCustomerType) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalCustomer = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalCustomer must be used within a ModalCustomerProvider');
  }
  return context;
};

type ModalCustomerProviderProps = {
  children?: ReactNode;
};

export const ModalCustomerProvider = ({ children }: ModalCustomerProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataCustomerType } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataCustomerType) => {
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
        {currentModal?.modalName === ModalCustomerType.Edit && <div> Edit Modal</div>}
        {currentModal?.modalName === ModalCustomerType.Delete && (
          <DeleteCustomer closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalCustomerType.AddCustomer && (
          <AddCustomer closeModal={closeModal} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
