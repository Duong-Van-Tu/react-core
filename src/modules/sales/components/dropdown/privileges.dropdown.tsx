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
  Evaluation,
  Report,
  SuggestedEdit,
  RefuseEdit,
  UpdateResults,
  ProposedReports,
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
      case MenuItem.Evaluation:
        openModal(ModalPrivilegesType.Evaluation);
        break;
      case MenuItem.Report:
        openModal(ModalPrivilegesType.Report);
        break;
      case MenuItem.RefuseEdit:
        openModal(ModalPrivilegesType.RefuseEdit);
        break;
      case MenuItem.UpdateResults:
        openModal(ModalPrivilegesType.UpdateResults);
        break;
      case MenuItem.ProposedReports:
        openModal(ModalPrivilegesType.ProposedReports);
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
      label: <span>{formatMessage({ id: 'title.dropdown.edit' })}</span>,
      onClick: () => handleItemClick(MenuItem.RequestEdit),
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'title.dropdown.delete' })}</span>,
      onClick: () => handleItemClick(MenuItem.Delete),
    },
    {
      key: '3',
      label: <span>{formatMessage({ id: 'title.dropdown.privileges.suggestedEdit' })}</span>,
      onClick: () => handleItemClick(MenuItem.SuggestedEdit),
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'title.dropdown.privileges.refuseEdit' })}</span>,
      onClick: () => handleItemClick(MenuItem.RefuseEdit),
    },
    {
      key: '5',
      label: <span>{formatMessage({ id: 'title.dropdown.privileges.report' })}</span>,
      onClick: () => handleItemClick(MenuItem.Report),
    },
    {
      key: '6',
      label: <span>{formatMessage({ id: 'title.dropdown.privileges.updateResults' })}</span>,
      onClick: () => handleItemClick(MenuItem.UpdateResults),
    },
    {
      key: '7',
      label: <span>{formatMessage({ id: 'title.dropdown.relationship.evaluate' })}</span>,
      onClick: () => handleItemClick(MenuItem.Evaluation),
    },
    {
      key: '8',
      label: <span>{formatMessage({ id: 'title.dropdown.relationship.proposedReports' })}</span>,
      onClick: () => handleItemClick(MenuItem.ProposedReports),
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
