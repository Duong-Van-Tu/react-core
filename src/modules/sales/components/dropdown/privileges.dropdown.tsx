/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalPrivileges } from '../modals/privileges';
import { ModalPrivilegesType } from '../../enum/privileges.enum';

enum MenuItem {
  EditPrivileges = 1,
  Report,
  SuggestedEdit,
  Delete,
}

type PrivilegesDropdownProps = {
  data: DataBenefitType;
};

export function PrivilegesDropdown({ data }: PrivilegesDropdownProps) {
  const { openModal } = useModalPrivileges();
  const { formatMessage } = useLocale();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.EditPrivileges:
        openModal(ModalPrivilegesType.EditPrivileges, data);
        break;
      case MenuItem.SuggestedEdit:
        openModal(ModalPrivilegesType.SuggestedEdit, data);
        break;
      case MenuItem.Report:
        openModal(ModalPrivilegesType.Report);
        break;
      case MenuItem.Delete:
        openModal(ModalPrivilegesType.Delete);
        break;
      default:
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'dropdown.edit' })}</span>,
      onClick: () => handleItemClick(MenuItem.EditPrivileges),
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'dropdown.privileges.suggestedEdit' })}</span>,
      onClick: () => handleItemClick(MenuItem.SuggestedEdit),
    },

    {
      key: '3',
      label: <span>{formatMessage({ id: 'dropdown.report' })}</span>,
      onClick: () => handleItemClick(MenuItem.Report),
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'dropdown.delete' })}</span>,
      onClick: () => handleItemClick(MenuItem.Delete),
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
