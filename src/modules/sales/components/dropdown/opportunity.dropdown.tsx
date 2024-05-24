/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalOpportunity } from '../modals/opportunity';
import { useNavigate } from 'react-router-dom';
import { getTenant } from '@/utils/common';
import { usePermission } from '@/hooks/permission.hook';
import { ModalOpportunityType } from '../../enum/modal.enum';

enum MenuItem {
  AssignOpportunity = 1,
  CloseOpportunity,
  Delete,
  CreateHistoryOpportunity,
}

type OpportunityDropdownProps = {
  data: DataOpportunityType;
};
export function OpportunityDropdown({ data }: OpportunityDropdownProps) {
  const { openModal } = useModalOpportunity();
  const { formatMessage } = useLocale();
  const { isSaleDirector } = usePermission();
  const navigate = useNavigate();
  const tenant = getTenant();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.AssignOpportunity:
        openModal(ModalOpportunityType.AssignOpportunity, data);
        break;
      case MenuItem.CloseOpportunity:
        openModal(ModalOpportunityType.CloseOpportunity, data);
        break;
      case MenuItem.Delete:
        openModal(ModalOpportunityType.Delete, data);
        break;
      case MenuItem.CreateHistoryOpportunity:
        openModal(ModalOpportunityType.CreateHistoryOpportunity);
        break;
      default:
        break;
    }
  };
  const directorItems: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'dropdown.edit' })}</span>,
      onClick: () => navigate(`/sales/opportunity/${data?.id}?tenant=${tenant}`),
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.assignOpportunity' })}</span>,
      onClick: () => handleItemClick(MenuItem.AssignOpportunity),
    },
    {
      key: '3',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.updateOpportunity' })}</span>,
      onClick: () => navigate(`/sales/opportunity/history-opportunity/${data.id}?tenant=${tenant}`),
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.closeOpportunity' })}</span>,
      onClick: () => handleItemClick(MenuItem.CloseOpportunity),
    },
    {
      key: '5',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.resultReport' })}</span>,
      onClick: () => navigate(`/sales/opportunity/report-opportunity/${data.id}?tenant=${tenant}`),
    },
    {
      key: '6',
      label: <span>{formatMessage({ id: 'dropdown.delete' })}</span>,
      onClick: () => handleItemClick(MenuItem.Delete),
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'dropdown.edit' })}</span>,
      onClick: () => navigate(`/sales/opportunity/${data?.id}?tenant=${tenant}`),
    },

    {
      key: '2',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.updateOpportunity' })}</span>,
      onClick: () => navigate(`/sales/opportunity/history-opportunity/${data.id}?tenant=${tenant}`),
    },
    {
      key: '3',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.closeOpportunity' })}</span>,
      onClick: () => handleItemClick(MenuItem.CloseOpportunity),
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.resultReport' })}</span>,
      onClick: () => navigate(`/sales/opportunity/report-opportunity/${data.id}?tenant=${tenant}`),
    },
    {
      key: '5',
      label: <span>{formatMessage({ id: 'dropdown.delete' })}</span>,
      onClick: () => handleItemClick(MenuItem.Delete),
    },
  ];

  return (
    <Dropdown menu={{ items: isSaleDirector ? directorItems : items }} placement="bottomRight">
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
