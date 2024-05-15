/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalPrivileges } from '../modals/privileges';
import { ModalPrivilegesType } from '../../enum/privileges.enum';

enum MenuItem {
  RequestEdit = 1,
  Report,
  SuggestedEdit,
  RefuseEdit,
  Delete,
}

export function PrivilegesDropdown() {
  const { openModal } = useModalPrivileges();
  const { formatMessage } = useLocale();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.RequestEdit:
        openModal(ModalPrivilegesType.RequestEdit);
        break;
      case MenuItem.SuggestedEdit:
        openModal(ModalPrivilegesType.SuggestedEdit);
        break;
      case MenuItem.Report:
        openModal(ModalPrivilegesType.Report);
        break;
      case MenuItem.RefuseEdit:
        openModal(ModalPrivilegesType.RefuseEdit);
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
      onClick: () => handleItemClick(MenuItem.RequestEdit),
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'dropdown.delete' })}</span>,
      onClick: () => handleItemClick(MenuItem.Delete),
    },
    {
      key: '3',
      label: <span>{formatMessage({ id: 'dropdown.privileges.suggestedEdit' })}</span>,
      onClick: () => handleItemClick(MenuItem.SuggestedEdit),
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'dropdown.privileges.refuseEdit' })}</span>,
      onClick: () => handleItemClick(MenuItem.RefuseEdit),
    },
    {
      key: '5',
      label: <span>{formatMessage({ id: 'dropdown.report' })}</span>,
      onClick: () => handleItemClick(MenuItem.Report),
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
