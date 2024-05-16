/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalKPI } from '../modals/kpi';
import { ModalKPIType } from '../../enum/kpi.enum';

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
      key: '1',
      label: formatMessage({ id: 'title.dropdown.finalize' }),
      onClick: () => handleItemClick(MenuItem.FinalizeKPI),
    },
    {
      key: '2',
      label: formatMessage({ id: 'title.dropdown.kpi.editKPI' }),
      onClick: () => handleItemClick(MenuItem.EditKPI),
    },
    {
      key: '3',
      label: formatMessage({ id: 'title.dropdown.requestEdit' }),
      onClick: () => handleItemClick(MenuItem.RequestEdit),
    },
    {
      key: '4',
      label: formatMessage({ id: 'title.dropdown.kpi.modifyKPI' }),
      onClick: () => handleItemClick(MenuItem.ModifyKPI),
    },
    {
      key: '5',
      label: formatMessage({ id: 'title.dropdown.kpi.report' }),
      onClick: () => handleItemClick(MenuItem.Report),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
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
