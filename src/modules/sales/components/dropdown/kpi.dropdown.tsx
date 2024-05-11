/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { CustomIcon } from '@/components/icons';
import { useLocale } from '@/hooks/locale.hook';
import { useModalKPI } from '../modals/kpi';
import { ModalKPIType } from '../../enum/kpi.enum';

enum MenuItem {
  RequestEdit = 1,
  SetKPI,
  Evaluation,
  Report,
}

export function KPIDropdown() {
  const { openModal } = useModalKPI();
  const { formatMessage } = useLocale();

  const handleItemClick = (key: number) => {
    switch (key) {
      case MenuItem.RequestEdit:
        openModal(ModalKPIType.RequestEdit);
        break;
      case MenuItem.SetKPI:
        openModal(ModalKPIType.SetKPI);
        break;
      case MenuItem.Evaluation:
        openModal(ModalKPIType.Evaluation);
        break;
      case MenuItem.Report:
        openModal(ModalKPIType.Report);
        break;
      default:
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'title.dropdown.requestEdit' }),
      onClick: () => handleItemClick(MenuItem.RequestEdit),
    },
    {
      key: '2',
      label: formatMessage({ id: 'title.dropdown.kpi.setKPI' }),
      onClick: () => handleItemClick(MenuItem.SetKPI),
    },
    {
      key: '3',
      label: formatMessage({ id: 'title.dropdown.kpi.evaluation' }),
      onClick: () => handleItemClick(MenuItem.Evaluation),
    },
    {
      key: '4',
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
