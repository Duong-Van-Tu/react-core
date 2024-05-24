import { ModalServiceType } from '@/modules/category/enum/service-category.enum';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { AddService } from './add-service.modal';
import { DeleteService } from './delete-service.modal';
import { UpdateService } from './update-service.modal';

type ModalContexttype = {
  openModal: (modalName: string, data?: DataServiceCategoryType, serviceIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalService = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalService must be used within a ModalServiceProvider');
  }
  return context;
};

type ModalServiceProviderProps = {
  children?: ReactNode;
};

export const ModalServiceProvider = ({ children }: ModalServiceProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataServiceCategoryType; serviceIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataServiceCategoryType, serviceIds?: string[]) => {
    setCurrentModal({ modalName, data, serviceIds });
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
        {currentModal?.modalName === ModalServiceType.EditService && (
          <UpdateService closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalServiceType.DeleteService && (
          <DeleteService
            closeModal={closeModal}
            data={currentModal.data!}
            serviceIds={currentModal.serviceIds!}
          />
        )}
        {currentModal?.modalName === ModalServiceType.AddService && (
          <AddService closeModal={closeModal} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
