/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { ModalRelationshipLevelType } from '../../enum/relationship-level.enum';
import { useModalRelationshipLv } from '../modals/relationship-level';

enum MenuItem {
  EditRelationLevel = 1,
}

type RelationshipLvDropdownProps = {
  data?: DataReationshipLevelType;
};

export function RelationshipLvDropdown({ data }: RelationshipLvDropdownProps) {
  const { openModal } = useModalRelationshipLv();
  const { formatMessage } = useLocale();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.EditRelationLevel:
        openModal(ModalRelationshipLevelType.EditRelationLevel, data);
        break;
      default:
        break;
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'dropdown.edit' })}</span>,
      onClick: () => handleItemClick(MenuItem.EditRelationLevel),
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
