/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';

import { ModalHumaResourceType } from '../../enum/huma-resource.enum';
import { useModalUserCategry } from '../modals/human-resource';

enum MenuItem {
  EditHumanResource = 1,
}

type UserDropdownProps = {
  data?: DataUserType;
};

export function UserCategoryDropdown({ data }: UserDropdownProps) {
  const { openModal } = useModalUserCategry();
  const { formatMessage } = useLocale();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.EditHumanResource:
        openModal(ModalHumaResourceType.EditHumanResource, data);
        break;
      default:
        break;
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'dropdown.edit' })}</span>,
      onClick: () => handleItemClick(MenuItem.EditHumanResource),
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
