import { ModalSupplierType } from '@/modules/category/enum/supplier.enum';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { AddSupplier } from './add.modal';
import { DeleteSupplier } from './delete.supplier';
import { UpdateSupplier } from './update.supplier';

type ModalContexttype = {
  openModal: (modalName: string, data?: DataSupplierType, supplierIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalSupplier = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalSupplier must be used within a ModalSupplierProvider');
  }
  return context;
};

type ModalSupplierProviderProps = {
  children?: ReactNode;
};

export const ModalSupplierProvider = ({ children }: ModalSupplierProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataSupplierType; supplierIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataSupplierType, supplierIds?: string[]) => {
    setCurrentModal({ modalName, data, supplierIds });
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
        {currentModal?.modalName === ModalSupplierType.EditSupplier && (
          <UpdateSupplier closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalSupplierType.DeleteSupplier && (
          <DeleteSupplier
            closeModal={closeModal}
            data={currentModal.data!}
            customerIds={currentModal.supplierIds!}
          />
        )}
        {currentModal?.modalName === ModalSupplierType.AddSupplier && (
          <AddSupplier closeModal={closeModal} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
