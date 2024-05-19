/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { ModalOpportunityType } from '../../enum/opportunity.enum';
import { useModalOpportunity } from '../modals/opportuity';
import { useNavigate } from 'react-router-dom';
import { getTenant } from '@/utils/common';

enum MenuItem {
  AssignOpportunity = 1,
  CloseOpportunity,
  Delete,
}

type OpportunityDropdownProps = {
  data: DataOpportunityType;
};
export function OpportunityDropdown({ data }: OpportunityDropdownProps) {
  const { openModal } = useModalOpportunity();
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const tenant = getTenant();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.AssignOpportunity:
        openModal(ModalOpportunityType.AssignOpportunity);
        break;
      case MenuItem.CloseOpportunity:
        openModal(ModalOpportunityType.CloseOpportunity);
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
      onClick: () => navigate(`/sales/opportunity/update-opportunity?tenant=${tenant}`),
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.closeOpportunity' })}</span>,
      onClick: () => handleItemClick(MenuItem.CloseOpportunity),
    },
    {
      key: '5',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.resultReport' })}</span>,
      onClick: () => navigate(`/sales/opportunity/report-opportunity?tenant=${tenant}`),
    },
    {
      key: '6',
      label: <span>{formatMessage({ id: 'dropdown.delete' })}</span>,
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
