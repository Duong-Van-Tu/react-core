/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { ModalCustomerType } from '../../enum/customer.enum';
import { useModalCustomer } from '../modals/customer';

enum MenuItem {
  Edit = 1,
}

type CustomerDropdownProps = {
  data?: DataCustomerType;
  customerIds?: string[];
};

export function CustomerDropdown({ data }: CustomerDropdownProps) {
  const { openModal } = useModalCustomer();
  const { formatMessage } = useLocale();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.Edit:
        openModal(ModalCustomerType.Edit, data);
        break;
      default:
        break;
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{formatMessage({ id: 'dropdown.edit' })}</span>,
      onClick: () => handleItemClick(MenuItem.Edit),
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
