import { ModalProjectType } from '@/modules/category/enum/project.enum';
import { Modal } from 'antd';
import { ReactNode, createContext, useContext, useState } from 'react';
import { AddProject } from './add-project.modal';
import { DeleteProject } from './delete-project.modal';
import { EditProject } from './edit-project.modal';
import { UpdateProject } from './update-project.modal';

type ModalContexttype = {
  openModal: (modalName: string, data?: DataProjectType, projectIds?: string[]) => void;
  closeModal: () => void;
};
const ModalContext = createContext<ModalContexttype | undefined>(undefined);

export const useModalProject = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalProject must be used within a ModalProjectProvider');
  }
  return context;
};

type ModalProjectProviderProps = {
  children?: ReactNode;
};

export const ModalProjectProvider = ({ children }: ModalProjectProviderProps) => {
  const [currentModal, setCurrentModal] = useState<
    { modalName: string; data?: DataProjectType; projectIds?: string[] } | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);

  const openModal = (modalName: string, data?: DataProjectType, projectIds?: string[]) => {
    setCurrentModal({ modalName, data, projectIds });
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
        {currentModal?.modalName === ModalProjectType.EditProject && (
          <EditProject closeModal={closeModal} data={currentModal.data!} />
        )}
        {currentModal?.modalName === ModalProjectType.DeleteProject && (
          <DeleteProject
            closeModal={closeModal}
            data={currentModal.data!}
            projectIds={currentModal.projectIds!}
          />
        )}
        {currentModal?.modalName === ModalProjectType.AddProject && (
          <AddProject closeModal={closeModal} />
        )}
        {currentModal?.modalName === ModalProjectType.UpdateProject && (
          <UpdateProject closeModal={closeModal} data={currentModal.data!} />
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
