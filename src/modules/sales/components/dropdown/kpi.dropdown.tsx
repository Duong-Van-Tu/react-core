/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalKPI } from '../modals/kpi';
import { ModalKPIType } from '../../enum/kpi.enum';
import { usePermission } from '@/hooks/permission.hook';

enum MenuItem {
  EditKPI = 1,
  ModifyKPI,
  RequestEdit,
  FinalizeKPI,
  ReviewEdit,
  Report,
}
type KPIDropdownProps = {
  data?: DataKPIType;
};

export function KPIDropdown({ data }: KPIDropdownProps) {
  const { openModal } = useModalKPI();
  const { formatMessage } = useLocale();
  const { isSale } = usePermission();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.EditKPI:
        openModal(ModalKPIType.EditKPI, data);
        break;
      case MenuItem.FinalizeKPI:
        openModal(ModalKPIType.FinalizeKPI, data);
        break;
      case MenuItem.RequestEdit:
        openModal(ModalKPIType.RequestEdit, data);
        break;
      case MenuItem.Report:
        openModal(ModalKPIType.Report, data);
        break;
      case MenuItem.ModifyKPI:
        openModal(ModalKPIType.ModifyKPI, data);
        break;
      default:
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      key: MenuItem.EditKPI,
      label: formatMessage({ id: 'title.dropdown.kpi.editKPI' }),
      onClick: () => handleItemClick(MenuItem.EditKPI),
    },
    {
      key: MenuItem.RequestEdit,
      label: formatMessage({ id: 'title.dropdown.requestEdit' }),
      onClick: () => handleItemClick(MenuItem.RequestEdit),
    },
    {
      key: MenuItem.ModifyKPI,
      label: formatMessage({ id: 'title.dropdown.kpi.modifyKPI' }),
      onClick: () => handleItemClick(MenuItem.ModifyKPI),
    },
    {
      key: MenuItem.Report,
      label: formatMessage({ id: 'title.dropdown.kpi.report' }),
      onClick: () => handleItemClick(MenuItem.Report),
    },
  ];

  const saleItems: MenuProps['items'] = [
    {
      key: MenuItem.FinalizeKPI,
      label: formatMessage({ id: 'title.dropdown.finalize' }),
      onClick: () => handleItemClick(MenuItem.FinalizeKPI),
    },
    {
      key: MenuItem.RequestEdit,
      label: formatMessage({ id: 'title.dropdown.requestEdit' }),
      onClick: () => handleItemClick(MenuItem.RequestEdit),
    },
    {
      key: MenuItem.Report,
      label: formatMessage({ id: 'title.dropdown.kpi.report' }),
      onClick: () => handleItemClick(MenuItem.Report),
    },
  ];

  return (
    <Dropdown menu={{ items: isSale ? saleItems : items }} placement="bottomRight">
      <span css={dropdownIcon}>
        <CustomIcon type="three-dot" width={16} height={18} />
      </span>
    </Dropdown>
  );
}

const dropdownIcon = css`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
