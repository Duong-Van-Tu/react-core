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
      label: (
        <button css={menuItemBtn} onClick={() => handleItemClick(MenuItem.RequestEdit)}>
          {formatMessage({ id: 'title.dropdown.requestEdit' })}
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button css={menuItemBtn} onClick={() => handleItemClick(MenuItem.SetKPI)}>
          {formatMessage({ id: 'title.dropdown.kpi.setKPI' })}
        </button>
      ),
    },
    {
      key: '3',
      label: (
        <button css={menuItemBtn} onClick={() => handleItemClick(MenuItem.Evaluation)}>
          {formatMessage({ id: 'title.dropdown.kpi.evaluation' })}
        </button>
      ),
    },
    {
      key: '4',
      label: (
        <button css={menuItemBtn} onClick={() => handleItemClick(MenuItem.Report)}>
          {formatMessage({ id: 'title.dropdown.kpi.report' })}
        </button>
      ),
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

const menuItemBtn = css`
  background: none;
  border: none;
  font-size: 1.4rem;
  line-height: 1.6rem;
  width: 100%;
  text-align: left;
`;
