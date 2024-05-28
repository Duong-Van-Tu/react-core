/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalProject } from '../modals/project';
import { ModalProjectType } from '../../enum/project.enum';

enum MenuItem {
  EditProject = 1,
  UpdateProject,
}

type ProjectDropdownProps = {
  data?: DataProjectType;
};

export function ProjectDropdown({ data }: ProjectDropdownProps) {
  const { openModal } = useModalProject();
  const { formatMessage } = useLocale();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.EditProject:
        openModal(ModalProjectType.EditProject, data);
        break;
      case MenuItem.UpdateProject:
        openModal(ModalProjectType.UpdateProject, data);
        break;
      default:
        break;
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'dropdown.edit' })}</span>,
      onClick: () => handleItemClick(MenuItem.EditProject),
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'dropdown.update' })}</span>,
      onClick: () => handleItemClick(MenuItem.UpdateProject),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button css={actionIconBtn}>
        <CustomIcon type="three-dot" width={16} height={18} />
      </Button>
    </Dropdown>
  );
}

const actionIconBtn = css`
  background: none;
  border: none;
  box-shadow: unset;
  padding: 0;
`;
