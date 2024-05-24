/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalRelationship } from '../modals/relationship';
import { ModalRelationshipType } from '../../enum/modal.enum';
import { useNavigate } from 'react-router-dom';
import { getTenant } from '@/utils/common';

enum MenuItem {
  Report,
}

type RelationshipDropdownProps = {
  data?: DataRelationshipType;
};

export function RelationshipDropdown({ data }: RelationshipDropdownProps) {
  const { openModal } = useModalRelationship();
  const { formatMessage } = useLocale();
  const navigate = useNavigate();
  const tenant = getTenant();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.Report:
        openModal(ModalRelationshipType.ReportRelationship, data);
        break;
      default:
        break;
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'title.dropdown.relationship.update' })}</span>,
      onClick: () => navigate(`/sales/relationship/gains/${data?.id}?tenant=${tenant}`),
    },
    {
      key: '2',
      label: <span>{formatMessage({ id: 'title.dropdown.relationship.evaluate' })}</span>,

      onClick: () =>
        navigate(`/sales/relationship/relationshipGainsQuestion/${data?.id}?tenant=${tenant}`),
    },
    {
      key: '3',
      label: <span>{formatMessage({ id: 'title.dropdown.relationship.report' })}</span>,
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
