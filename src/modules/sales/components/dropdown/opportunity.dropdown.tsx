/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';

export function OpportunityDropdown() {
  const { formatMessage } = useLocale();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'title.dropdown.requestEdit' })}</span>,
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.assignOpportunity' })}</span>,
    },
    {
      key: '3',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.updateOpportunity' })}</span>,
    },
    {
      key: '4',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.closeOpportunity' })}</span>,
    },
    {
      key: '5',
      label: <span>{formatMessage({ id: 'title.dropdown.opportunity.resultReport' })}</span>,
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
