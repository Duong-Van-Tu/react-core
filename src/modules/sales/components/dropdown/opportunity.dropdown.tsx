/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { ModalOpportunityType } from '../../enum/opportunity.enum';
import { useOpportunityModal } from '../modals/opportuity';

enum MenuItem {
  RequestEdit = 1,
  AssignOpportunity,
  UpdateOpportunity,
  CloseOpportunity,
  Report,
  Delete,
}

export function OpportunityDropdown() {
  const { openModal } = useOpportunityModal();
  const { formatMessage } = useLocale();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.RequestEdit:
        openModal(ModalOpportunityType.RequestEdit);
        break;
      case MenuItem.AssignOpportunity:
        openModal(ModalOpportunityType.AssignOpportunity);
        break;
      case MenuItem.UpdateOpportunity:
        openModal(ModalOpportunityType.UpdateOpportunity);
        break;
      case MenuItem.CloseOpportunity:
        openModal(ModalOpportunityType.CloseOpportunity);
        break;
      case MenuItem.Report:
        openModal(ModalOpportunityType.Report);
        break;
      case MenuItem.Delete:
        openModal(ModalOpportunityType.Delete);
        break;
      default:
        break;
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'title.dropdown.requestEdit' })}</span>,
      onClick: () => handleItemClick(MenuItem.RequestEdit),
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.assignOpportunity' })}</span>,
      onClick: () => handleItemClick(MenuItem.AssignOpportunity),
    },
    {
      key: '3',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.updateOpportunity' })}</span>,
      onClick: () => handleItemClick(MenuItem.UpdateOpportunity),
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.closeOpportunity' })}</span>,
      onClick: () => handleItemClick(MenuItem.CloseOpportunity),
    },
    {
      key: '5',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.resultReport' })}</span>,
      onClick: () => handleItemClick(MenuItem.Report),
    },
    {
      key: '6',
      label: <span>{formatMessage({ id: 'title.dropdown.delete' })}</span>,
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
